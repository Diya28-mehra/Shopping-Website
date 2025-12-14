import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';    
import axios from 'axios'

const Verify = () => {
    const navigate = useNavigate();
    const {token,setCartItems,backendUrl} = useContext(ShopContext);
    const [searchParams] = useSearchParams();

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async()=>{
        try{
            if (!token)return null;
            const response = await axios.post(backendUrl + '/api/order/verifystripe',{success,orderId},{headers:{token}})
            console.log(response.data);
            if (response.data.success){
                setCartItems({})
                navigate('/orders')
            }
            else{
                navigate('/cart')
            }
        }
        catch(e){
            toast.error(e.message);
        }
    }

    useEffect(()=>{
       verifyPayment() 
    },[token])
  return (
    <div>

    </div>
  )
}

export default Verify