import React from 'react'
import {Route,Routes} from 'react-router-dom';
import Home from './pages/home.jsx';
import Collection from './pages/collection.jsx';
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import Product from './pages/product.jsx';
import Cart from './pages/cart.jsx';
import Login from './pages/login.jsx';
import PlaceOrder from './pages/place_order.jsx';  
import Orders from './pages/orders.jsx';
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SearchBar from './components/SearchBar.jsx';
import Verify from './pages/verify.jsx';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[5vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar/>
      <SearchBar/>
      <Routes >
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element = {<Collection/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/contact' element = {<Contact/>}/>
        <Route path='/product/:product_id' element = {<Product/>}/>
        <Route path='/cart' element = {<Cart/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/placeorder' element = {<PlaceOrder/>}/>
        <Route path='/orders' element = {<Orders/>}/>
        <Route path='/verify' element={<Verify/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App