import React, { createContext, useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import {toast} from 'react-toastify';
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency='$';
    const delieveryCharge=10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = React.useState('');
    const [showsearchbar, setShowSearchbar] = React.useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products,setProducts] = useState([]);
    const [token,setToken] = useState('');

    const addToCart = async (itemId,size) => { 

        if (!size) {
            alert('Please select a size');
            return;
        }

        let cardData = structuredClone(cartItems);
        if (cardData[itemId]){
            if (cardData[itemId]['sizes'][size]){
                cardData[itemId]['sizes'][size] += 1;
            } else {
                cardData[itemId]['sizes'][size] = 1;
            }
        } else {
            cardData[itemId] = { sizes: { [size]: 1 } };
        }
        setCartItems(cardData);

        if (token){
            try{
                await axios.post(`${backendUrl}/api/cart/add`,{itemId, size},{headers:{token}})
            }
            catch(error){
                toast.error(error.message)
            }
        }
    }

    const getCardCount = ()=>{
        let count = 0;
        for (const c in cartItems){
            for (const s in cartItems[c]['sizes']){
                try{
                    if (cartItems[c]['sizes'][s]>0){
                        count += cartItems[c]['sizes'][s];
                    }
                }
                catch(error){
                    toast.error(error.message)
                }
            }
        }
        return count;
    }

    const getCardAmount = ()=>{
        let amount = 0;
        for (const items in cartItems){
            const product_data = products.find((prod)=>prod.id==items)
            if (product_data) {
                for (const item in cartItems[items].sizes){
                    if (cartItems[items].sizes[item]>0){
                        amount += cartItems[items].sizes[item] * product_data.new_price
                    }
                }
            }
        }
        return amount;
    }

    const updateQuantity = async (itemId,size, quantity ) =>{
        let cardData = structuredClone(cartItems);
        if (cardData[itemId] && cardData[itemId]['sizes'][size]){
            cardData[itemId]['sizes'][size] = quantity;
            setCartItems(cardData);
        }
        
        if (token){
            try{
                await axios.post(`${backendUrl}/api/cart/update`,{itemId, size, qty: quantity},{headers:{token}})
            }
            catch(error){
                toast.error(error.message)
            }
        }
    }

    const getUserCart = async (token) => {
        try{
            const response = await axios.get(`${backendUrl}/api/cart/get`,{headers:{token}});
            if (response.data.success) {
                const backendCart = response.data.cartData;
                const formattedCart = {};
                for (const itemId in backendCart) {
                    formattedCart[itemId] = { sizes: backendCart[itemId] };
                }
                setCartItems(formattedCart);
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
    


    const getProductsData = async() =>{
        try{
            const response = await axios.get(`${backendUrl}/api/products/listall`);
            //console.log("response",response.data);
            if (response.data.success) {
                setProducts(response.data.products);
            }
            else{
                toast.error(response.data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData();
    },[])

    useEffect(()=>{
        if (!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    const value = {
        products,
        currency,
        delieveryCharge,
        search,
        setSearch,
        showsearchbar,
        setShowSearchbar,
        cartItems,
        addToCart,
        getCardCount,
        updateQuantity,
        getCardAmount,
        backendUrl,
        token,
        setToken,
        setCartItems
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )   
}

export default ShopContextProvider;