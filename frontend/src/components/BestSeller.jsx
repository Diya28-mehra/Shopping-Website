import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title.jsx'
import ProductItem from './ProductItem.jsx'
import { useEffect } from 'react'   

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestseller,setbestseller]=React.useState([]);
    useEffect(()=>{
        const bestproduct = products.filter((item)=>item.bestseller);
        setbestseller(bestproduct.slice(0,5));
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
             <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-5 sm:px-10 md:px-20 lg:px-32'>
            {bestseller.map((item,index)=>(
            <ProductItem key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price}/>
            ))
            }
        </div>
    </div>
  )
}

export default BestSeller