import React from 'react';
import Navbar from '../nav/Navbar';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SingleProductCard from './SingleProductCard';
import Footer from '../footer/footer';
import './style/products.css'; // Import your CSS file

const AddProducts = () => {
  const [productsData] = useCollectionData(collection(db, 'Products'));

  return (
    <>
      <Navbar />
      <div className=''>
        <h2 className='text-center font-semibold text-xl'>PRODUCTS</h2>
        <div className='product-container'>
          {productsData?.map((product) => (
            <SingleProductCard
              key={product.ProductId}
              name={product.ProductName}
              price={product.ProductPrice}
              imageId={product.ProductImg}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProducts;
