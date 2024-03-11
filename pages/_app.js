import React from 'react';
import Layout from '../components/Layout/Layout';
import '../components/styles/globals.css'
import CartProvider from '../components/store/CartProvider';

function MyApp({ Component, pageProps }) 
{
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
