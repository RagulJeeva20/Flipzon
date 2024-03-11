import React, { useContext,  } from 'react';
import cartsContext from '../store/CartsContext'
import classes from '../styles/card.module.css';

function Card(props) {

    const ctx=useContext(cartsContext)

    function addToCartHandler()
    {
        const item={
            id:props.id,
            name:props.product,
            prize:props.prize,
        }
        ctx.addItem(item);
    }

    const removeHandler=()=>{
        ctx.removeItem(props.id)
    }
    const isItemInCart = ctx.cartItems.some((item) => item.id === props.id);

    return (

        <>
            <div className={classes.card}>   
                <img src={props.img} alt={props.product}/>               
                <div className={classes.product}>{props.product}</div>
                <div className={classes.prize}>${props.prize}</div>
                <div>
                    {!isItemInCart && <button onClick={addToCartHandler}>Add to Cart</button>}
                    {isItemInCart && <button className={classes.removeButton} onClick={removeHandler}>Remove</button>}
                </div>     
            </div>
        </>
    );
}

export default Card;