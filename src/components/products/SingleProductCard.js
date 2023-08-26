import { ref } from "firebase/storage";
import { storage } from "../../firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useCart } from "./cartcontext";
import { useNavigate} from 'react-router-dom'
import { auth } from "../../firebase";
import { AddCircle, RemoveCircle, Delete } from '@mui/icons-material';


export default function SingleProductCard({ name, price, imageId }) {
    const navigate = useNavigate();
    const { cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const user = auth.currentUser;
    const [downloadUrl, loading, error] = useDownloadURL(
        ref(storage, `ProductImages/${imageId}.jpg`)
     );

    const cartItem = cartItems.find(item => item.id === imageId);

    const handleAddToCart = () => {
        if (user){
            addToCart({ id: imageId, name, price });
        } else {
            navigate("/login");
        }
    }

    return (
        <div className="w-full md:w-1/3 p-4 flex flex-col items-center">
            <div className="max-w-xs mx-auto">
                <img
                    src={downloadUrl}
                    className="object-contain h-48 w-full"
                    alt="product"
                />
            </div>
            <h3 className="text-lg font-semibold mt-2 text-center">{name}</h3>
            <p className="text-gray-600 text-center">Price: Ksh {price}</p>
            <button
                className="mt-3 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-400 transition duration-300 flex items-center"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent event from bubbling
                    handleAddToCart();
                  }}
                
            >
                {cartItem ? (
                    <>
                        <RemoveCircle onClick={() => decreaseQuantity(cartItem)} className="mr-1" />
                        {cartItem.quantity}
                        <AddCircle onClick={() => increaseQuantity(cartItem)} className="ml-1" />
                        <Delete onClick={() => removeFromCart(cartItem)} className="ml-2" />
                    </>
                ) : (
                    <>Add to Cart</>
                )}
            </button>
        </div>
    );
}

