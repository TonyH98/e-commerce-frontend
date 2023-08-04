import { useState , useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { fontWeight } from "@mui/system";
import {FaStar} from 'react-icons/fa'
const API = process.env.REACT_APP_API_URL;

function ReviewNewForm({user}){
  const [product , setProduct] = useState([])

  let { id } = useParams();

 let navigate = useNavigate();


let [review, setReview] = useState({
    reviewer: user?.username,
    title: "",
    content: "",
    rating: null,
    user_id: user?.id,
    product_id: id,
  });


  useEffect(() => {
    axios
      .get(`${API}/products/${id}`)
      .then((res) => {
        setProduct(res.data);
       
      })
      .catch((c) => {
        console.warn("catch", c);
      });
  }, [id]);



      const handleAdd = (newReview) => {
        axios
          .post(`${API}/products/${id}/reviews`, newReview)
          .then(
            (response) => {
             navigate(`/products/${id}`)
            },
            (error) => console.error(error)
          )
          .catch((c) => console.warn("catch", c));
      };



      const handleTextChange = (event) => {
        if (event.target.name !== "rating") {
          setReview({ ...review, [event.target.id]: event.target.value });
        } else if(event.target.name === "rating"){
          // Update the selected rating when a star is clicked
          const selectedRating = Number(event.target.value);
          setReview({ ...review, rating: selectedRating });
        }
      };

    

      const handleSubmit = (event) => {
        event.preventDefault();
         handleAdd(review)   
        
      };

     
    return(
      <div >
        

        <h1>Review: {product.product_name}</h1>
      <form onSubmit={handleSubmit} className="review-form">
        <label htmlFor="reviewer" className='label-signup'>Name:
        <input
          id="reviewer"
          value={review.reviewer}
          type="text"
          placeholder="Your name"
          required
        />
        
         </label>
       
    
        <label htmlFor="title" className='label-signup'>Title:
        <input
          id="title"
          type="text"
          required
          value={review.title}
         
        />
        
        </label>
    
     
   
        <label htmlFor="content" className='label-signup'>Review:
        
        <textarea
          id="content"
          type="text"
          name="content"
          value={review.content}
          placeholder="What do you think..."
          onChange={handleTextChange}
        />
        </label>
    

  <label htmlFor="rating" className="label-signup">Rating:
  
<div className="star_rating">
{[...Array(5)].map((star , index) => {
 const currentValue = index + 1;
  return (
    <div key={index}>
      <input
        type="radio"
        name="rating"
        id={`rating-${currentValue}`}
        value={currentValue}
        onChange={handleTextChange} 
        checked={currentValue === review.rating}
      />
     
     <label htmlFor={`rating-${currentValue}`}>
              <FaStar
                className="star"
                size={50}
                color={currentValue <= review.rating ? '#ffc107' : 'white'}
              />
            </label>

    </div>
  )
})}

</div>
  
  </label>

   
        <input type="submit" />
      <Link to={`/products/${id}`}>
        Back
      </Link>
      </form>


    </div>
    )
}


export default ReviewNewForm