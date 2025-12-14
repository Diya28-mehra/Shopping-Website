import React from 'react'
import { useContext } from 'react'
import { useEffect,useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
const RelatedProducts = ({category,subcategory}) => {
    const {products} = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(()=>{
        setRelated(products.filter(product=>product.category===category && product.subcategory===subcategory))
    },[category,subcategory])
    
  return (
    <div className='my-24'>
        <div className="text-center text-3xl py-2">
            <Title text1={'Related'} text2={'Products'}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10'>
            {related.map((item,index)=>(
                <ProductItem key = {index} id = {item.id} name = {item.name} new_price={item.new_price} image={item.image}/>
            ))}
        </div> 
    </div>
  )
}

export default RelatedProducts