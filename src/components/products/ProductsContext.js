import React, { createContext, useEffect, useState } from 'react';
import { db } from '../../firebase';

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = [];
        const querySnapshot = await db.collection('Products').get();
        querySnapshot.forEach((doc) => {
          productsData.push({
            ProductID: doc.id,
            ProductName: doc.data().ProductName,
            ProductPrice: doc.data().ProductPrice,
            ProductImg: doc.data().ProductImg,
          });
        });
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};
