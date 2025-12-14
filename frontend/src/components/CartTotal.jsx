import React from 'react'
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
const CartTotal = ({navigate}) => {
    const {currency, delieveryCharge, getCardAmount} = React.useContext(ShopContext);

  return (
    <div className='w-full border border-gray-300 p-6 bg-gray-50'>
        <div className="text-2xl">
            <Title text1={'CART'} text2={'TOTAL'}/>
        </div>
        <div className='mt-8 flex flex-col gap-4'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency}{(getCardAmount()).toFixed(2)}</p>
            </div>
            <div className='flex justify-between'>
                <p>Delievery Charges</p>
                <p>{currency}{delieveryCharge.toFixed(2)}</p>
            </div>
            <div className='border-t pt-4 flex justify-between font-semibold text-lg'>
                <p>Total</p>
                <p>{currency}{(getCardAmount() + delieveryCharge).toFixed(2)}</p>
            </div>
        </div>
        {navigate && (
            <div className='w-full text-end mt-6'>
                <button onClick={()=>navigate('/placeorder')} className='bg-black text-white px-8 py-3 text-sm'>PROCEED TO CHECKOUT</button>
            </div>
        )}
    </div>
  )
}

export default CartTotal