import React, { useRef, useState } from 'react';
import classes from '../styles/CartForm.module.css';

function CartForm(props) {
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const numberRef = useRef(null);
  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [numError, setNumError] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const isNameError = nameRef.current.value.trim().length === 0;
    const isAddressError = addressRef.current.value.trim().length === 0;
    const isNumError = numberRef.current.value.trim().length === 0;

    setNameError(isNameError);
    setAddressError(isAddressError);
    setNumError(isNumError);

    if (!isNameError && !isAddressError && !isNumError) {
      const userInfo = {
        Name: nameRef.current.value,
        Address: addressRef.current.value,
        phoneNo: numberRef.current.value,
      };
      props.addUserInfo(userInfo);
      props.setConfirmDialog(true);
    }
  };

  const nameHandler = () => setNameError(false);
  const addressHandler = () => setAddressError(false);
  const numberHandler = () => setNumError(false);

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.div}>
        <label className={classes.label}>Name</label>
        <input type="text" ref={nameRef} className={`${classes.inputBox} ${nameError ? classes.error : ''}`} onChange={nameHandler} />
        {nameError && <span className={classes.errorMessage}>Name is required</span>}
      </div>
      <div className={classes.div}>
        <label className={classes.label}>Address</label>
        <input type="text"  ref={addressRef} onClick={addressHandler} className={`${classes.inputBox} ${addressError ? classes.error : ''}`} />
        {addressError && <span className={classes.errorMessage}>Address is required</span>}
      </div>
      <div className={classes.div}>
        <label className={classes.label}>Phone</label>
        <input type="number" min="0" ref={numberRef} onClick={numberHandler} className={`${classes.inputBox} ${numError ? classes.error : ''}`} />
        {numError && <span className={classes.errorMessage}>Phone number is required</span>}
      </div>
      <div className={classes.paymentType}>
        <h4>Payment Type:</h4>
        <span className={classes.type}>cash-on-delivery</span>
      </div>
      <div className={classes.actions}>
        <button className={classes.cancel} type="button" onClick={props.checkoutHandler}>
          cancel
        </button>
        <button className={classes.checkout} type="submit">
          order
        </button>
      </div>
    </form>
  );
}

export default CartForm;
