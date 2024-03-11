import React, { useContext, useMemo, useState } from 'react';
import cartsContext from '../components/store/CartsContext'
import CartItem from '../components/Layout/CartItem';
import Modal from '../components/Layout/Modal';
import classes from '../components/styles/Cart.module.css'
import CartForm from '../components/Layout/CartForm';


function cartpage(props) {
    const ctx=useContext(cartsContext);
    const[checkingout,setCheckingout]=useState(false);
    const[confirmDialog,setConfirmDialog]=useState(false);
    const[userInfo,setUserInfo]=useState([])
    const[orderSent,setOrderSent]=useState(false);

    const checkoutHandler=()=>{
        setCheckingout((prevCheckingout)=>!prevCheckingout);

    }
    const cartProducts=useMemo(()=>{
        return ctx.cartItems.map((cartItem)=>
        <CartItem
            key={cartItem.id}
            id={cartItem.id}
            name={cartItem.name}
            prize={cartItem.prize}
            qty={cartItem.qty}
        >
        </CartItem>
        )
    },[ctx.cartItems]);

    const totalAmount=ctx.cartItems.reduce((total,cartItem)=>{
        const itemTotal=cartItem.qty*cartItem.prize;
        return total+itemTotal
    },0)

    const empty=ctx.cartItems.length===0?true:false;
    const addUserInfo=(userData)=>setUserInfo(userData);

    const OrderHandler=()=>{
        fetch('/api/NewOrders',{
            method:'POST',
            body:JSON.stringify({
                userData:userInfo,
                orderedItems:ctx.cartItems,
                totalAmount:'$'+totalAmount
            }),   
            headers:{
                'Content-Type': 'application/json'         
            }
        })
        setConfirmDialog(false);
        setOrderSent(true);
    }

    
    const DialogCancelHandler=()=>setConfirmDialog(false);
    const clearHandler=()=>{
        setOrderSent(false);
        ctx.clearCart();
    }
    

    return (
        <>
            {!empty && !orderSent && <Modal>
                <div>
                    {cartProducts}
                </div>
                <div className={classes.total}>
                    <h1>Total Amount</h1>
                    <span className={classes.totalAmount}>${totalAmount}</span>
                </div>
                {!checkingout && <div className={classes.actions}>
                    <button className={classes.checkout} onClick={checkoutHandler}>checkout</button>
                </div>}
                {checkingout && <CartForm checkoutHandler={checkoutHandler} setConfirmDialog={setConfirmDialog} addUserInfo={addUserInfo}/>}
            </Modal>}
            
            {empty && !orderSent &&  <div className={classes.emptyModel}>
                cart is empty
            </div>}

            {confirmDialog && <div className={classes.dialog}>
                <div className={classes.confirmDialog}>
                    <div className={classes.dialogText}>
                        Are you sure you want to submit the orders?
                    </div>
                    <div  className={classes.dialogButton}>
                        <button className={classes.no} onClick={DialogCancelHandler}>No</button>
                        <button onClick={OrderHandler} className={classes.yes}>Yes</button>
                    </div>
                </div>
            </div>}
            {orderSent && <div className={classes.OrderSentModel}>
                order sent successfully
                <button className={classes.clear} onClick={clearHandler}>clear</button>
            </div>}
        </>
    );
}

export default cartpage;