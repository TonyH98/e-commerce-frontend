import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Review from "./Review";

const API = process.env.REACT_APP_API_URL;

function Reviews({ user }) {
  const [reviews, setReviews] = useState([]);
  const [filterReviews, setFilterReviews] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${API}/products/${id}/reviews`).then((res) => {
      setReviews(res.data);
      setFilterReviews(res.data);
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
  

  const average =
    filterReviews.reduce((sum, review) => sum + review.rating, 0) /
    filterReviews.length;

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

  return (
    <section className="Reviews">
      <h2>Reviews</h2>
      <div className="review-data">
        <h2>Customer Reviews</h2>
        <p>Global Review Number: {filterReviews.length}</p>
        <p>Average Score: {isNaN(average) ? `No Reviews` : average.toFixed(2)}</p>


        <Link to={`/products/${id}/reviews/chart`}>Review Statistics</Link>
        <br></br>
        <select onChange={(e) => handleCategory(e.target.value)}>
          <option value="">All Reviews</option>
          {[...Array(5)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1} Star Reviews
            </option>
          ))}
        </select>

      </div>
      <Link to={`/products/${id}/new`}>
        <button className="create-review">Write a Review</button>
      </Link>


      {filterReviews.map((review) => (
        <Review
          key={review.id}
          review={review}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          user={user}
        />
      ))}
    </section>
  );
}

export default Reviews;
