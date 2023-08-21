import React, { useEffect, useState } from 'react';
import { useCart } from '../products/cartcontext';
import { firestore, auth } from '../../firebase'; // Import firestore and auth from your firebase.js
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Dog1 from "../assets/dog1.jpg";
import Dog2 from "../assets/dog2.jpg";
import Cat1 from "../assets/cat1.jpg";
import GS3 from "../assets/gs3.jpg";
import GS4 from "../assets/gs4.jpg";
import Horse1 from "../assets/horse1.jpg";
import Navbar from '../nav/Navbar'; // Make sure to adjust the path as needed
import Footer from '../footer/footer'; // Make sure to adjust the path as needed
import './style/products.css';

const ProductsPage = () => {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const [user, setUser] = useState(auth.currentUser);

  const products = [
    { id: 1, name: "Japanese Spitz", image: Dog1, price: 10000 },
    { id: 2, name: "St. Bernard", image: Dog2, price: 15000 },
    { id: 3, name: "Fluffy Cat", image: Cat1, price: 8000 },
    { id: 4, name: "German Shepherd 3", image: GS3, price: 20000 },
    { id: 5, name: "German Shepherd 4", image: GS4, price: 18000 },
    { id: 6, name: "Horse", image: Horse1, price: 50000 },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const syncCartWithFirestore = (updatedCartItems) => {
    if (user) {
      const cartRef = firestore.collection('users').doc(user.uid);
      cartRef.set({ cartItems: updatedCartItems }, { merge: true });
    }
  };

  const handleAddToCart = (product) => {
    if (user) {
      addToCart(product);
      syncCartWithFirestore([...cartItems, { ...product, quantity: 1 }]);
    } else {
      // Redirect to login or show a login modal
      // Example: history.push('/login');
      console.log('User not logged in. Display login form.');
    }
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const getProductQuantityInCart = (productId) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const renderCartButtons = (product) => {
    const productId = product.id;
    const quantityInCart = getProductQuantityInCart(productId);

    if (isProductInCart(productId)) {
      return (
        <div className="cart-buttons-container">
          <button className="secondary-button" onClick={() => decreaseQuantity(product)}>
            <RemoveIcon />
          </button>
          <span>{quantityInCart}</span>
          <button className="secondary-button" onClick={() => increaseQuantity(product)}>
            <AddIcon />
          </button>
          <button className="remove-button" onClick={() => removeFromCart(product)}>
            <DeleteIcon />
          </button>
        </div>
      );
    } else {
      return (
        <button className="secondary-button" onClick={() => handleAddToCart(product)}>
          Add to Cart
        </button>
      );
    }
  };

  return (
    <div>
      <Navbar />
      <header className="header" id="top">
        <h1>Our Products</h1>
      </header>

      <div className="product-container">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: Ksh {product.price}</p>
            {renderCartButtons(product)}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
