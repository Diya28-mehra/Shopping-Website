import React from 'react'
import { useContext,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CardTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom'
const cart = () => {

  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const data = [];
      for (const items in cartItems) {
        for (const item in cartItems[items].sizes) {
          if (cartItems[items].sizes[item] > 0) {
            data.push({
              id: items,
              size: item,
              quantity: cartItems[items].sizes[item]
            })
          }
        }
      }
      setCartData(data);
      console.log(data);
    }
  }, [cartItems, products]);
  return (
    <div className='border-t pd-t '>
      <div className="text-2xl mb-3 mt-5">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const product_data = products.find((prod) => prod.id == item.id)
          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={product_data.image[0]} alt="" />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{product_data.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{product_data.new_price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item.id, item.size, Number(e.target.value))} />
              <p onClick={() => updateQuantity(item.id, item.size, 0)} className='cursor-pointer'>🗑️</p>
            </div>
          )
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CardTotal navigate={navigate} />
        </div>
      </div>
    </div>
  )
}

export default cart