import React, { useEffect, useState } from 'react';
import Navbar from '../nav/Navbar';
import { collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import {ref} from "firebase/storage"
import { useDownloadURL , useUploadFile } from 'react-firebase-hooks/storage'
import { useCollectionOnce ,useCollectionData} from  "react-firebase-hooks/firestore"
import SingleProductCard from './SingleProductCard';
import Footer from '../footer/footer'


const AddProducts = () => {
  const [productsData, productsLoading, productsError] = useCollectionData(collection(db,"Products"));
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [image, setImage] = useState(null);

 async function handleUpload (){
    if (image){
      await  uploadFile(  ref( storage, "ProductImages/test"), image)
    }      
  }

  console.log(productsData)
  return (
    <>
      <Navbar />
      <div className='App'>
     {/* <input type="file" accept="image/*"  onChange={ (e)=> setImage(e.target.files[0])} />  
      <button className=" p-4  bg-black text-white" onClick={handleUpload}>Upload Image</button> */} 
        <h2 className="text-center font-semibold text-xl">PRODUCTS</h2>
        <div className='product-container'>
          {productsData?.map(product => (
             <SingleProductCard key={product.ProductId} name={product.ProductName} price={product.ProductPrice} imageId={product.ProductImg} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProducts;
