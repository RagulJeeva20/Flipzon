import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import classes from '../Layout/MainNavigation.module.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import cartsContext from '../store/CartsContext';

const Header = (props) => {
  const ctx = useContext(cartsContext);
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };
  const selectHandler=(event)=>ctx.handleSelectChange(event.target.value);


  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>flipzon</h1>
      <nav>
        <ul>
          <li>
            <select onChange={selectHandler} className={classes.dropdown}>
              <option>All</option>
              <option>phones</option>
              <option>dresses</option>
              <option>electronics</option>
            </select>
          </li>
          <li>
            <span onClick={() => handleNavigation('/')} className={router.pathname === '/' ? classes.activeLink : classes.cartLink} >
              Home
            </span>
          </li>
          <li>
            <span onClick={() => handleNavigation('/cart')} className={router.pathname === '/cart' ? classes.activeLink : classes.cartLink}>
              cart
              <AiOutlineShoppingCart className={classes.cartlogo} />
              <span className={classes.badge}>{ctx.totalItems}</span>
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;



 