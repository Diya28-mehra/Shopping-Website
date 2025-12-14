import React,{useState} from 'react'
import logo from '../assets/logo.jpg'
import profile from '../assets/profile.png'
import searchicon from '../assets/searchicon.png'
import cart from '../assets/cart.jpg'
import menuicon from '../assets/menu_icon.png'
import { Link, NavLink } from 'react-router-dom';
import dropdown from '../assets/dropdown.png'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate() 
    const {setShowSearchbar,getCardCount, token,setToken,setCartItems} = useContext(ShopContext);

    const logout = () => {
        setToken(null)
        localStorage.removeItem("token")
        setCartItems([])
        navigate('/login')
    }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to={`/`}> <img src={logo} className='w-26' alt="logo" /></Link>
      <ul className = 'hidden sm:flex gap-5 text-sm text:gray-700'>
        <NavLink to = '/' className='flex flex-col items-center gap-1 '>
            <p>Home</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
        <NavLink to = '/collection' className='flex flex-col items-center gap-1'>
            <p>Collection</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
        <NavLink to = '/about' className='flex flex-col items-center gap-1'>
            <p>About</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
        <NavLink to = '/contact' className='flex flex-col items-center gap-1'>
            <p>Contact</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
      </ul>

      <div className = 'flex items-center gap-6'> 
        <img onClick={()=>setShowSearchbar(true)} src={searchicon} className='w-5 cursor-pointer' alt=""/>
        <div className='group relative'>
            <img onClick={()=>token?null:navigate('/login')} className = 'w-5 cursor-pointer' src={profile}></img>
            {/*Drop Down*/}
            {token && 
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px5 bg-slate-100 text-gray-500 rounded-lg'>
                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                    <p onClick={()=>navigate('/orders')}className='cursor-pointer hover:text-black'>Orders </p>
                    <p onClick={logout} className='cursor-pointer hover:text-black'>LogOut</p>
                </div>
            </div>
            }
        </div>
        <Link to = '/cart' className='relative'>
            <img src={cart} className='w-5 min-w-5' alt=""/>
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCardCount()}</p>
        </Link>
        <img onClick={()=>{setVisible(true)}} src = {menuicon} className='w-6 sm:hidden cursor-pointer' alt =""/>
      </div>
      {/* Side Bar Menu for Small screens */}

      <div className={`absolute top-0 right-0 bottom-0 overflow-hiden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className = 'flex flex-col text-gray-600'>
            <div onClick={()=>{setVisible(false)}} className = 'flex items-center gap-4 p3 cursor-pointer'>
                <img className = 'h-4 rotate-180'src={dropdown}  alt=""/>
                <p>Back</p>
            </div>
            <NavLink onClick={()=>setVisible(false)} to='/' className='py-2pl-6 border'>Home</NavLink>
            <NavLink onClick={()=>setVisible(false)} to='/contact' className='py-2pl-6 border'>Contact</NavLink>
            <NavLink onClick={()=>setVisible(false)} to='/collection' className='py-2pl-6 border'>Collection</NavLink>
            <NavLink onClick={()=>setVisible(false)} to='/about' className='py-2pl-6 border'>About</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
