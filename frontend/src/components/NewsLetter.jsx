import React from 'react'

const NewsLetter = () => {

    const onSubmitHandler = (event)=>{
        event.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800 mb-4'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Join our newsletter to stay updated with the latest trends and exclusive offers.</p>
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row items-center justify-center mt-6 gap-4 max-w-md m-auto pb-10'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
            <button type='submit' className='bg-black text-white px-6 py-2 mt-4 sm:mt-0 sm:ml-2 hover:bg-gray-800 transition-ease-in-out duration-300'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter