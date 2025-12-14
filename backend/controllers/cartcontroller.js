import express from 'express';
import UserModel from '../models/userModel.js';


//add products to user cart
const addToCart = async(req,res)=>{
    try{
        const {userId,itemId,size} = req.body;
        const user = await UserModel.findById(userId);
        const cartData = await user.cartData;
        if (cartData[itemId]){
            if (cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {[size]:1}
        }
        await UserModel.findByIdAndUpdate(userId, {cartData})
        res.json({success:true, message:"Added to cart"})
    }
    catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}


//update user cart
const updateCart = async(req,res)=>{
    try{
        const {userId,itemId,size,qty} = req.body;
        const user = await UserModel.findById(userId);
        let cartData = await user.cartData;
        cartData[itemId][size]=qty;
        await UserModel.findByIdAndUpdate(userId, {cartData})
        res.json({success:true, message:"updated to cart"})
    }
    catch(error){
        res.status(500).json({success:false, message:error.message})
    }  
}



//get user cart data
const getUserCart = async(req,res)=>{
    try{
        const {userId} = req.body;
        const user = await UserModel.findById(userId);
        let cartData = await user.cartData;
        res.json({success:true, cartData})
    }
    catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

export {addToCart, updateCart, getUserCart}