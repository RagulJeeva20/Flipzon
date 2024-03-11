import React, { useContext, useState,useEffect } from 'react';
import Card from '../components/Layout/Card';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import cartsContext from '../components/store/CartsContext';

function Home(props) {
  const [filteredProducts, setFilteredProducts] = useState(props.products); 
  const ctx = useContext(cartsContext);

  useEffect(() => {
    if (ctx.selectedOption === 'All') {
      setFilteredProducts(props.products);
    } else if (ctx.selectedOption) {
      const filteredProducts = props.products.filter(product => product.type === ctx.selectedOption);
      setFilteredProducts(filteredProducts);
    }
  }, [ctx.selectedOption, props.products]);

  return (
    <>
      <Head>
        <title>products</title>
        <meta name='description' content='order the products you want to..!'/>
      </Head>
      <div className='products'>
        <ul>
          {filteredProducts.map((product) => (
            <Card key={product.id} id={product.id} img={product.img} prize={product.prize} product={product.name}></Card>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://ragul123:ragul123@cluster0.cejcgxw.mongodb.net/flipzon?retryWrites=true&w=majority');
  const db = client.db();

  const productsCollection = db.collection('products');
  const products = await productsCollection.find().toArray();

  return {
    props: {
      products: products.map(product => ({
        name: product.name,
        id: product.id,
        img: product.img,
        prize: product.prize,
        type: product.type,
      })),
    },
    revalidate: 1,
  };
}

export default Home;
