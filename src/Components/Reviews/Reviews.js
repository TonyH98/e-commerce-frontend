import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Review from "./Review";
import ReviewNewForm from "./ReviewNewForm";
import "./Reviews.css"

const API = process.env.REACT_APP_API_URL;

function Reviews({ user }) {
  const [reviews, setReviews] = useState([]);
  const [filterReviews, setFilterReviews] = useState([]);
  const [show , setShow] = useState(false)

  const [modal , setModal] = useState(false)

  const { id } = useParams();

const handleShow = () => {

setShow(!show)

}


  useEffect(() => {
    axios.get(`${API}/products/${id}/reviews`)
    .then((res) => {
      setReviews(res.data);
      setFilterReviews(res.data);
    });
  }, [id , show, modal]);

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
          setReviews(copyReviewArray); // Update the reviews state array
          setFilterReviews(copyReviewArray); // Update the filterReviews state array
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
        setReviews(copyReviewArray); // Update the reviews state array
        setFilterReviews(copyReviewArray); // Update the filterReviews state array
      })
      .catch((c) => console.warn("catch", c));
  };
  
console.log(filterReviews)

  let average = 0

  for(let i = 0; i < filterReviews.length; i++){
    average += (Number(filterReviews[i].rating) / filterReviews.length)
    
  }

  const handleCategory = (rating) => {
    if (rating === "") {
      setFilterReviews(reviews);
    } else {
      const filteredReviews = reviews.filter(
        (review) => review.rating == parseInt(rating)
      );
      setFilterReviews(filteredReviews);
    }
  };


console.log(user)

  return (
    <section className="Reviews">
      <h2>Reviews</h2>
      <div className="review-data">
        <h2>Customer Reviews</h2>
        <p>Global Review Number: {filterReviews.length}</p>
        <p>Average Score: {isNaN(average) ? `No Reviews` : average.toFixed(2)}</p>
        <select className="review-select-bar" onChange={(e) => handleCategory(e.target.value)}>
          <option value="">All Reviews</option>
          {[...Array(5)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1} Star Reviews
            </option>
          ))}
        </select>

      </div>
      {user ? (

        <button onClick={() => setModal(true)} className="create-review">Write a Review</button>
 

      ) : null}
      <ReviewNewForm user={user} open={modal} onClose={() => setModal(false)}/>
      
      <div className="reviews-container">

      {filterReviews.map((review) => (
        <Review
          key={review.id}
          review={review}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          user={user}
         handleShow={handleShow}
         show={show}
        />
      ))}

      </div>
    </section>
  );
}

export default Reviews;
