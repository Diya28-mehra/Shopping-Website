import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../components/NewsLetter'

const About = () => {
  return (
    <div>
      {/* About Us Section */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.women1} alt="About us" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>We are a leading fashion retailer committed to bringing you the latest trends and timeless classics. Our journey began with a simple mission: to make high-quality fashion accessible to everyone.</p>
          <p>With years of experience in the fashion industry, we carefully curate our collections to ensure that every piece meets our high standards of quality, style, and affordability. From casual wear to formal attire, we have something for every occasion.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>To provide exceptional fashion experiences through quality products, outstanding customer service, and innovative shopping solutions that inspire confidence and self-expression.</p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly online platform, shopping has never been easier. Browse, select, and purchase with just a few clicks.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>

      <NewsLetter/>
    </div>
  )
}

export default About