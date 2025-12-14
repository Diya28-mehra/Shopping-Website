import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
const product = () => {
  const {product_id} = useParams();
  const {products,currency, addToCart} = useContext(ShopContext);
  const [product_data,setproduct_data] = useState(false);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('');

  const fetchproductdata = async () => {
    products.map((item)=>{
      if (item.id == product_id){
        console.log('Product data:', item);
        setproduct_data(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchproductdata();
  },[product_id])

  return product_data?(
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*Product Data*/}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*Product Images*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product_data.image.map((item,index)=>(
              <img src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" onClick={()=>setImage(item)} />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/*Product Info*/}
        <div className='flex-1'>
          <h1 className='text-3xl font-semibold'>{product_data.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <div className='flex text-yellow-400'>
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className='text-gray-600'>(122)</p>
          </div>
          <p className='text-xl font-medium mt-3'>{currency}{product_data.new_price.toFixed(2)} {product_data.old_price && <span className='line-through text-gray-500 text-base font-normal ml-2'>{currency}{product_data.old_price.toFixed(2)}</span>}</p>
          <p className='text-gray-700 mt-4'>{product_data.description || 'No description available'}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {(product_data.size).map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(product_data.id,size)} className='bg-black text-white py-3 px-6 w-40 hover:bg-gray-800 transition-colors duration-300'>Add to Cart</button>
          <hr className='mt-8 sm:w-4/5'></hr>
          <div className="text-sm text-gray-600 mt-4 flex flex-col gap-1">
            <p>Text 10% original Product</p>
            <p>Cash on Delievery is available on this product</p>
            <p>Easy Return and Exchange Policy within 7 days</p>
          </div>
        </div>    
      </div>   

      {/*Descrition and Review Sextion*/} 
      <div className="mt-20">
        <div className='flex'>
          <b className='border border-gray-300 px-5 py-3 text-sm'>Description</b>
          <p className='border border-gray-300 px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className="flex border-gray-300 flex-col gap-6 border px-6 py-6 text-sm text-gray-500">
          <p>{product_data.description || 'No description available for this product.'}</p>
        </div>
      </div>
      

      {/*display related products*/}
      <RelatedProducts category={product_data.category} subcategory={product_data.subcategory}/>
    </div>  
  ): <div className='opacity-0'></div>
}

export default product