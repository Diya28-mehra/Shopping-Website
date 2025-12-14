import express from 'express'
import OrderModel from '../models/orderModel.js'
import UserModel from '../models/userModel.js'
import Stripe from 'stripe';
import Razorpay from 'razorpay';

//gateway initialised
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Initialize Razorpay only if keys are provided
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })
}

//global variables
const currency = 'usd'
const delievery_charge= 10


//Placing Orders usign COD method
const placeOrder = async(req,res)=>{
    const {userId,items,amount,address} = req.body;
    try{
        const OrderData = {
            userId,
            items,
            amount,
            address,
            status: "pending",
            payment_method: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new OrderModel(OrderData);
        await newOrder.save();
        await UserModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed"})
    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}


//Placing Orders usign stripe method
const placeOrderStripe = async(req,res)=>{
    try{
        const{userId,amount,address,items} = req.body;
        const {origin} = req.headers;
         const OrderData = {
            userId,
            items,
            amount,
            address,
            status: "pending",
            payment_method: "Stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new OrderModel(OrderData);
        await newOrder.save();
        const line_items = items.map((item)=>({
            price_data:{
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.new_price*100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: delievery_charge*100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment'
        })

        console.log('Session created:', session.id)
        console.log('Session URL:', session.url)
        res.json({success:true,session_url:session.url})

    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}


//verify stripe 
const verify_Stripe = async(req,res)=>{
    const {orderId,success,userId} = req.body
    console.log('Verify Stripe called:', {orderId, success, userId})
    try{
        if (success==='true'){
            console.log('Payment successful, updating order:', orderId)
            await OrderModel.findByIdAndUpdate(orderId,{payment:true})
            await UserModel.findByIdAndUpdate(userId,{cartData:{}})
            console.log('Order updated successfully')
            res.json({success:true})
        }
        else{
            console.log('Payment failed, deleting order:', orderId)
            await OrderModel.findByIdAndDelete(orderId)
            res.json({success: false})
        }
    }
    catch(err){
        console.log('Error in verify_Stripe:', err)
        res.json({success:false,message: err.message})
    }
}


//Placing Orders usign razorpay method
const placeOrderRazorpay = async(req,res)=>{
    try{
        if (!razorpay) {
            return res.json({success:false,message:"Razorpay is not configured"})
        }

        const {userId,items,amount,address} = req.body;
        const {origin} = req.headers;
         const OrderData = {
            userId,
            items,
            amount,
            address,
            status: "pending",
            payment_method: "Razorpay",
            payment: false,
            date: Date.now()
        }
        const newOrder = new OrderModel(OrderData);
        await newOrder.save();

        const options = {
            amount: amount*100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        }

        razorpay.orders.create(options,(error,order)=>{
            if (error){
                console.log(error)
                return res.json({success:false,message:error})
            }
            res.json({success:true,order})
        })

    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

//All orders data 
const allOrders = async(req, res)=>{
    try{
        const orders = await OrderModel.find({});
        res.json({success:true,orders})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}


//User orders data for frontend 
const userOrders = async(req, res)=>{
    try{
        console.log('userOrders called')
        const {userId} = req.body;
        console.log('userId:', userId)
        const orders = await OrderModel.find({userId});
        console.log('orders found:', orders)
        res.json({success:true,orders})
    }catch(err){
        console.log('Error in userOrders:', err)
        res.json({success:false,message:err.message})
    }
}

//verify razorpay payment
const verifyRazorpay = async(req, res)=>{
    try{
        if (!razorpay) {
            return res.json({success:false,message:"Razorpay is not configured"})
        }

        const {userId, razorpay_order_id} = req.body;
        console.log('Verify Razorpay called:', {userId, razorpay_order_id})
        
        const orderInfo = await razorpay.orders.fetch(razorpay_order_id)
        console.log('Order info:', orderInfo)
        
        if (orderInfo.status === 'paid'){
            await OrderModel.findByIdAndUpdate(orderInfo.receipt, {payment: true})
            await UserModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success:true, message: 'Payment Successful'})
        } else {
            res.json({success:false, message: 'Payment Failed'})
        }
    }catch(err){
        console.log('Error in verifyRazorpay:', err)
        res.json({success:false, message:err.message})
    }
}

//update order status for admin panel
const updateOrderStatus = async(req, res)=>{
    try{
        const {orderId, status} = req.body;
        await OrderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message: 'Status Updated'})
    }catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}

export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, verify_Stripe, verifyRazorpay, updateOrderStatus}
