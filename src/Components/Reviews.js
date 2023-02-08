import axios from "axios";
import { useState, useEffect } from "react";
import { useParams , Link } from "react-router-dom";
import Review from "./Review";


const API = process.env.REACT_APP_API_URL;

function Reviews(){

    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
  
    useEffect(() => {
      axios.get(`${API}/products/${id}/reviews`)
      .then((response) => {
        setReviews(response.data);
      });
    }, [id]);

    
    const handleDelete = (id) => {
        axios
          .delete(`${API}/products/${id}/reviews/${id}`)
          .then(
            (response) => {
              const copyReviewArray = [...reviews];
              const indexDeletedReview = copyReviewArray.findIndex((review) => {
                return review.id === id;
              });
              copyReviewArray.splice(indexDeletedReview, 1);
              setReviews(copyReviewArray);
            },
            (error) => console.error(error)
          )
          .catch((c) => console.warn("catch", c));
      };


      const handleEdit = (updatedReview) => {
        axios
          .put(`${API}/products/${id}/reviews/${updatedReview.id}`, updatedReview)
          .then((response) => {
            const copyReviewArray = [...reviews];
            const indexUpdatedReview = copyReviewArray.findIndex((review) => {
              return review.id === updatedReview.id;
            });
            copyReviewArray[indexUpdatedReview] = response.data;
            setReviews(copyReviewArray);
          })
          .catch((c) => console.warn("catch", c));
      };
    

      


      return (
        <section className="Reviews">
          <Link to={`/products/${id}/new`}>
          <button>Write a Review</button>
          </Link>
          <h2>Reviews</h2>
          {reviews.map((review) => (
            <Review key={review.id} review={review} handleDelete={handleDelete}handleEdit={handleEdit}/>
          ))}
        </section>
      );
}


export default Reviews