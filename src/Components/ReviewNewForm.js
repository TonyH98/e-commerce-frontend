import { useState , useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function ReviewNewForm(){
  const [product , setProduct] = useState([])

  let { id } = useParams();

 let navigate = useNavigate();

 const [review, setReview] = useState({
    reviewer: "",
    title: "",
    content: "",
    rating: "",
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
        setReview({ ...review, [event.target.id]: event.target.value });
      };

      

      
console.log(product)

      const handleSubmit = (event) => {
        event.preventDefault();
         handleAdd(review)   
        
      };

    return(
      <div className="new-form">
        <h1>Review: {product.product_name}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reviewer">Name:</label>
        <input
          id="reviewer"
          value={review.reviewer}
          type="text"
          onChange={handleTextChange}
          placeholder="Your name"
          required
        />
        <br></br>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          required
          value={review.title}
          onChange={handleTextChange}
        />
        <br></br>
        <label htmlFor="rating">Rating:</label>
        <input
          id="rating"
          type="number"
          name="rating"
          min="0"
          max="5"
          step="1"
          value={review.rating}
          onChange={handleTextChange}
        />
        <br></br>
        <br></br>
        <label htmlFor="content">Review:</label>
        <textarea
          id="content"
          type="text"
          name="content"
          value={review.content}
          placeholder="What do you think..."
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" />
      </form>
      <Link to={`/products/${id}`}>
        Back
      </Link>
    </div>
    )
}


export default ReviewNewForm