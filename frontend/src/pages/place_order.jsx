import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import {useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const place_order = () => {

  const [method,setMethod] = useState('cod');
  const navigate = useNavigate();
  const {backendUrl,token,cartItems,setCartItems,getCardAmount,delieveryCharge,products} = useContext(ShopContext);
  const [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    street_address:'',
    city:'',
    pincode:'',
    state:'',
    country:'',
    addresstype:''
  })

  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data=>({...data,[name]:value}))
  }


  const initpay = (order) =>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount : order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async(response) =>{
        console.log('Razorpay response:', response)
        try{
          const verifyResponse = await axios.post(backendUrl+'/api/order/verifyrazorpay',response,{headers:{token}})
          console.log('Verify response:', verifyResponse.data)
          if (verifyResponse.data.success){
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(verifyResponse.data.message)
          }
        }catch(err){
          console.log('Verify error:', err)
          toast.error(err.response?.data?.message || err.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSumbitHandler = async (e) =>{
    e.preventDefault();
    try{
      let orderItems = [];
      for (const itemId in cartItems){
        for (const size in cartItems[itemId].sizes){
          if (cartItems[itemId].sizes[size]>0){
            const itemInfo = structuredClone(products.find(product=>product.id == itemId))
            if (itemInfo){
              itemInfo.size=size
              itemInfo.quantity=cartItems[itemId].sizes[size]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCardAmount()+ delieveryCharge,
      }

      switch(method){
        //api calls for cod order
        case 'cod':
          const response = await axios.post(backendUrl+'/api/order/placeorder',orderData,{headers:{token}})
          if (response.data.success){
            setCartItems({});
            navigate('/orders');
          }else{
            toast.error(response.data.message)
          }
          break;
        case 'stripe':
          const responseStripe = await axios.post(backendUrl+'/api/order/placeorderstripe',orderData,{headers:{token}})
          console.log(responseStripe)
          console.log('Stripe response:', responseStripe.data)
          if (responseStripe.data.success){
            const {session_url} = responseStripe.data
            console.log('Redirecting to:', session_url)
            window.location.replace(session_url)
          }
          else{
             toast.error(responseStripe.data.message)
          }
          break;

        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl+'/api/order/placeorderrazorpay',orderData,{headers:{token}})
          console.log(responseRazorpay)
          console.log('razorpay response:', responseRazorpay.data)
          if (responseRazorpay.data.success){
            console.log('here')
            initpay(responseRazorpay.data.order)
          }
          else{
             toast.error(responseRazorpay.data.message)
          }
          break;
        
        default:
          break;
      }
    }
    catch(err){
      toast.error(response.data.message)
    }
  }
  return (
    <form onSubmit ={onSumbitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 '>
      {/* Left Section */}
      <div className="flex flex-col gap-4 w-full sm:w-1/2">
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Place'} text2={'Your Order'}/>
        </div>
        <div className="flex flex-col gap-4">
          <div className='flex gap-3'>
            <input onChange = {onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded p-3 w-full' type="text" placeholder='First Name' required/>
            <input onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded p-3 w-full' type="text" placeholder='Last Name' required/>
          </div>
          <input onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded p-3 w-full' type="email" placeholder='Email Address' required/>
          <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded p-3 w-full' type="tel" placeholder='Phone Number' required/>
          <input onChange={onChangeHandler} name='street_address' value={formData.street_address} className='border border-gray-300 rounded p-3 w-full' type="text" placeholder='Street Address' required/>
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded p-3 w-full' type="text" placeholder='City' required/>
            <input onChange={onChangeHandler} name='pincode' value={formData.pincode} className='border border-gray-300 rounded p-3 w-full' type="text" placeholder='Pincode' required/>
          </div>
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded p-3 w-full' type="text" placeholder='State' required/>
            <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded p-3 w-full' type="text" placeholder='Country' required/>
          </div>
          <select onChange={onChangeHandler} name='addresstype' value={formData.addresstype} className='border border-gray-300 rounded p-3 w-full text-gray-500' required>
            <option value="">Select Address Type</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
          </select>
        </div>
      </div>

      {/* Right Section */}
      <div className="mt-8 w-full sm:w-1/2">
        <div className="mt-8 min-w-80">
          <CartTotal/>
        </div>
        <div className='min-w-80 mt-10'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>

          {/*Payment Method*/}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe"/>
            </div>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay"/>
            </div>
             <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default place_order