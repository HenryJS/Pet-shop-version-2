import  { ref} from "firebase/storage"
import  { storage} from "../../firebase"
import  { useDownloadURL} from "react-firebase-hooks/storage"

// 5QUYeLUH1zw1Kwdwr7SG
export default function SingleProductCard({ name, price, imageId }) {
    const [downloadUrl, loading, error] = useDownloadURL( ref(storage ,`ProductImages/${imageId}.jpg`))
     console.log(error)
    return (
        <div className="">
            <img src={downloadUrl} className=" h-56 w-56" alt="logo" />
            <h3>{name}</h3>
            <p>Price: Ksh {price}</p>
        </div>
    )
}
