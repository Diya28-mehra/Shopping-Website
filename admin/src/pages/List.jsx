import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/products/listall`);
      //console.log(response.data);
      if (response.data.success) {
        setList(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/products/remove`, {id}, {headers:{token}});
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='p-5'>
      <p className='mb-4 text-xl font-semibold'>All Products List</p>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left border border-gray-200'>
          <thead className='text-xs uppercase bg-gray-100'>
            <tr>
              <th className='px-6 py-3'>Image</th>
              <th className='px-6 py-3'>Name</th>
              <th className='px-6 py-3'>Category</th>
              <th className='px-6 py-3'>Price</th>
              <th className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index} className='border-b hover:bg-gray-50'>
                <td className='px-6 py-4'>
                  <img className='w-16 h-16 object-cover rounded' src={item.image[0]} alt=''/>
                </td>
                <td className='px-6 py-4'>{item.name}</td>
                <td className='px-6 py-4'>{item.category}</td>
                <td className='px-6 py-4'>${item.new_price}</td>
                <td className='px-6 py-4'>
                  <button onClick={()=>removeProduct(item._id)} className='text-red-600 hover:text-red-800 cursor-pointer'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default List