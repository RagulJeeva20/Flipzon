import React, { useCallback, useEffect,  useState } from 'react';
import CartsContext from '../store/CartsContext';

function CartProvider(props) {
    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedOption,setSelectedOption]=useState('All');


    const addItem = useCallback((items) => {
        const existedItem =cartItems.find((cartItem)=>cartItem.id=== items.id);
        
        if(existedItem)
        {
            const newCartItems=cartItems.map((cartItem)=>
            cartItem.id=== items.id?
            {...existedItem,qty:existedItem.qty+1}
            :
            cartItem
            )
            setCartItems(newCartItems);
        }
        if (!existedItem)
        {
        setCartItems((prevCartItems) => [
            ...prevCartItems,
            {...items,qty:1}
        ]);
        setTotalItems((prevTotalItems)=>prevTotalItems + 1);
        }
       
    },[cartItems]);


    const removeItem=useCallback((id)=>{
        const existedItem=cartItems.find((cartItem)=>cartItem.id===id);
        if (existedItem.qty===1)
        {
            const newCartItems=cartItems.filter((cartItem)=>
            cartItem.id!==id
            )
            setCartItems(newCartItems);
            setTotalItems((prevTotalItems)=>prevTotalItems-1)
            
        }
        else
        {
            const newCartItems=cartItems.map((cartItem)=>
            cartItem.id===id?
            {...existedItem,qty:existedItem.qty-1}
            :
            cartItem
            )
            setCartItems(newCartItems)
        }
    },[cartItems])

    const clearCart=()=>{
        setCartItems([]);
        setTotalItems(0);
    }
    const handleSelectChange=(type)=>setSelectedOption(type);



    useEffect(() => {
        console.log('Updated Cart Items:', cartItems);
        console.log('Updated Total Items:',totalItems);
    }, [cartItems, totalItems]);
   

    const cart = {
        cartItems:cartItems,
        totalItems:totalItems,
        addItem:addItem,
        removeItem:removeItem,
        clearCart:clearCart,
        handleSelectChange:handleSelectChange,
        selectedOption:selectedOption,
        
    };

    return (
        <CartsContext.Provider value={cart}>
            {props.children}
        </CartsContext.Provider>
    );
}

export default CartProvider;
