import {createContext} from 'react';

const cartsContext=createContext({
    cartItems:[],
    totalItems:0,
    addItem:(item)=>{},
    removeItem:(id)=>{},
    clearCart:()=>{},
    selectedOption:'All',
    handleSelectChange:(type)=>{},
    

});
export default cartsContext;