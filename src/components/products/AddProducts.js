import Navbar from '../nav/Navbar';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useCollectionData} from  "react-firebase-hooks/firestore"
import SingleProductCard from './SingleProductCard';
import Footer from '../footer/footer'


const AddProducts = () => {
  const [productsData] = useCollectionData(collection(db,"Products"));

  console.log(productsData)

  return (
    <>
      <Navbar />
      <div className='App'> 
        <h2 className="text-center font-semibold text-xl">PRODUCTS</h2>
          <div className='product-container grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center'>
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
