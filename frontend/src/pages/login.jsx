import { toast } from 'react-toastify';
import React, { useState,useContext,useEffect } from 'react'
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
const login = () => {
  const [currentState, setcurrentState] = useState('Login');
  const {token,setToken,backendUrl} = useContext(ShopContext)
  const navigate = useNavigate()

  const [name,setName] = useState('')
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const onsubmitHandler = async (event) => {
    event.preventDefault();
    try{
      if (currentState==='Sign Up'){
        const resp = await axios.post(backendUrl+'/api/user/register',{name,email,password})
        console.log(resp.data);
        if (resp.data.success){
          setToken(resp.data.token)
          localStorage.setItem('token',resp.data.token)
        }
        else{
          toast.error(resp.data.message)
        }
      }
      else{
        const resp = await axios.post(backendUrl+'/api/user/login',{email,password})
        console.log(resp.data);
        if (resp.data.success){
          setToken(resp.data.token)
          localStorage.setItem('token',resp.data.token)
        }
        else{
          toast.error(resp.data.message)
        }
      }
    }
    catch(error){
      toast.error(error.message)
    } 
  }

  useEffect(()=>{
    if (token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onsubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState === 'Sign Up' && <input onChange={(e)=>setName(e.target.value)} type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input type='email' onChange={(e)=>setEmail(e.target.value)} className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input type='password' onChange={(e)=>setPassword(e.target.value)} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />

      <div className='w-full flex justify-between text-sm mt-[-8px] mb-10'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login' 
          ? <p onClick={() => setcurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
          : <p onClick={() => setcurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState}</button>
    </form>
  )
}

export default login