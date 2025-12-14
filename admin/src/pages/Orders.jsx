import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({token}) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    console.log('fetchAllOrders called')
    console.log('token:', token)
    if (!token) {
      console.log('No token')
      return null;
    }
    try {
      console.log('Making request to:', backendUrl + '/api/order/allorders')
      const response = await axios.get(backendUrl + '/api/order/allorders', {headers: {token}})
      console.log('Response:', response.data)
      if (response.data.success) {
        console.log('Orders:', response.data.orders)
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.log('Error:', err)
      toast.error(err.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/updateorderstatus', {orderId, status: event.target.value}, {headers: {token}})
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className='p-5'>
      <h3 className='mb-4 text-xl font-semibold'>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
            <img className='w-12' src={assets.parcel_icon} alt=''/>
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                  } else {
                    return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>
                  }
                })}
              </div>
              <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
              <p className='mt-3'>Method: {order.payment_method}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold border border-gray-300 rounded'>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders