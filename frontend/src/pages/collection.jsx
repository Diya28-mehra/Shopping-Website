import React, { useContext, useState } from 'react'
import dropdown from '../assets/dropdown.png'
import Title from '../components/Title'
import { useEffect } from 'react'
import ProductItem from '../components/ProductItem'
import { ShopContext } from '../context/ShopContext'

const collection = () => {
  const {products,search, showsearchbar} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false);
  const [filterproducts, setFilterProducts] = useState([]);
  const [category,setcategory] = useState([]);
  const [subcategory,setsubcategory] = useState([]);
  const [sortType,setSortType] = useState('relevant');

  const toggleCategory = (e) =>{
    if (category.includes(e.target.value)){
      setcategory(prev=>prev.filter(item=>item!=e.target.value))
    }
    else{
      setcategory(prev=>[...prev,e.target.value])
    }
  }

  const togglesubcategory = (e)=>{
    if (subcategory.includes(e.target.value)){
      setsubcategory(prev=>prev.filter(item=>item!=e.target.value))
    }
    else{
      setsubcategory(prev=>[...prev,e.target.value])    }
  }


  const applyFilter = ()=>{
    let productsCopy = products.slice();

    if (showsearchbar && search){
      console.log('Applying search filter with term:', search);
      productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length>0){
      productsCopy = productsCopy.filter(item=>category.includes(item.category))
    }
    if (subcategory.length>0){
      productsCopy = productsCopy.filter(item=>subcategory.includes(item.subcategory))
    }
    setFilterProducts(productsCopy)
  }


  const sortProduct = () =>{
    let fcopy = products.slice();
    switch(sortType){
      case 'low-high':
        setFilterProducts(fcopy.sort((a,b)=>a.new_price-b.new_price));
        break;
      case 'high-low':
        setFilterProducts(fcopy.sort((a,b)=>b.new_price-a.new_price));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(()=>{
    applyFilter();
  },[products,category,subcategory,search,showsearchbar])

  useEffect(()=>{
    sortProduct();
  },[sortType])


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/*Filter Options*/}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={dropdown} alt="" />
        </p>
        
        {/*Category Filter*/}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory}/> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory}/> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory}/> Kids
            </p>
          </div>
        </div>
        
        {/*SubCategory Filter*/}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Topwear'} onChange={togglesubcategory}/> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={togglesubcategory}/> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Winterwear'} onChange={togglesubcategory}/> Winterwear
            </p>
          </div>
        </div>
      </div>


      {/*Right Side - Products*/}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/*Sort BY Products*/}
          <select onChange={(e)=>setSortType(e.target.value)}className='border-2 border-gray-300 px-2 text-sm '>
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>
        
        {/*Products Grid*/}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterproducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item.id} new_price={item.new_price} image={item.image}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default collection