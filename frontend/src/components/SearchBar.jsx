import React, { use, useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import searchicon from '../assets/searchicon.png'
import crossicon from '../assets/crossicon.png'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
const SearchBar = () => {

    const {search,setSearch,showsearchbar,setShowSearchbar}= useContext(ShopContext);
    const location = useLocation();
    const [visible,setVisible]= useState(false);

    useEffect(() => { 
      if (location.pathname.includes('collection')) {
        setVisible(true);
        setShowSearchbar(true);
      }
      else {
        setVisible(false);
        setShowSearchbar(false);
      }
    }, [location, setShowSearchbar]);
  return showsearchbar && visible?(
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} type='text' placeholder='Search' className='flex-1 outline-none bg-inherit text-sm'></input>
            <img src={searchicon} alt="" className='w-4'/>
        </div>
        <img onClick={()=>setShowSearchbar(false)} className='inline w-3 cursor-pointer' src={crossicon} alt=''/>
    </div>
  ): null
}

export default SearchBar 