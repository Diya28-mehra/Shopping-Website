import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';
import { useState,useEffect } from 'react';

const LatestCollection = () => {
  const {products} = useContext(ShopContext);
  const [latestproducts,setlatestproducts]=useState([]);
  useEffect(()=>{
    setlatestproducts(products.slice(0,10));
  },[products])
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
      </div>

      {/* Rendering Products*/}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-5 sm:px-10 md:px-20 lg:px-32'>
        {latestproducts.map((item,index)=>(
          <ProductItem key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price}/>
        ))
        }
      </div>
    </div>
  )
}

export default LatestCollection