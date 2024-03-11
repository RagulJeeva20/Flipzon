import React, { useContext } from 'react';
import cartsContext from '../store/CartsContext';
import classes from '../styles/CartItem.module.css';

const CartItem=React.memo((props)=> {
    const total=+props.qty*props.prize
    const ctx=useContext(cartsContext)
    function addHandler()
    {   
        const item={
        id:props.id
    }
        ctx.addItem(item)
    }

    const removeHandler=()=>ctx.removeItem(props.id)
    

    return (
        <>
        <div className={classes.cartItem}>
            <div className={classes.itemInfo}>
                <div className={classes.title}>
                    <h1 className={classes.name}>{props.name}</h1>
                </div>
                <div>
                    <button  className={classes.actions} onClick={removeHandler}>
                            - 
                    </button>
                    <button  className={classes.actions} onClick={addHandler}>
                         + 
                    </button>
                </div>
            </div>
            <div className={classes.prizeInfo}>
                <div className={classes.quantity}>
                    <span className={classes.prize}>${props.prize}</span>
                    <span className={classes.qty}>x {props.qty}</span>
                </div>
                <div className={classes.total}>
                    <span>${total}</span>
                </div>
            </div>
        </div>
        </>
    );
})

export default CartItem;