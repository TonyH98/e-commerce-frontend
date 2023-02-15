import { useParams, Link } from "react-router-dom"
import {useState , useEffect} from "react"
import axios from "axios";


const API = process.env.REACT_APP_API_URL;

function ReviewDetails(){

    const [reviews, setReviews] = useState([]);
    const [product , setProduct] = useState([])


const {id} = useParams()
const {ids} = useParams()



useEffect(() => {
    axios.get(`${API}/products/${id}/reviews/${ids}`)
    .then((res) => {
      setReviews(res.data)
    });
  }, [id , ids]);

  useEffect(() => {
    axios.get(`${API}/products/${id}`)
    .then((res) => {
      setProduct(res.data)
    });
  }, [id , ids]);

console.log(reviews)


    return(
        <div className="review-container">
            <div>
            <br></br>
            <img 
                src={product.image} 
                className="review-image"
                alt={`${product.product_name}`} 
              />
          </div>

          <div className="review-content">
            <div style={{fontSize: "25px"}}>{reviews.reviewer}</div>
            <br></br>

            <div>
                <div style={{fontWeight: "bold"}}>{reviews.title}</div> 
                <div> Rating: {reviews.rating}</div>
            </div>

            <br></br>
            <div style={{fontSize:"25px"}}>{reviews.content}</div>
        </div>
       
        </div>
    )
}


export default ReviewDetails