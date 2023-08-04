import ReviewForm from "./ReviewEdit";
import { useState } from "react";
import { FaStar } from 'react-icons/fa';
import { Link, useParams } from "react-router-dom";
import ReadMore from "../Other/ReadMore";

function Review({ review, handleDelete, handleEdit, user }) {
  const [hidden, setHidden] = useState(false);

  const toggleView = () => {
    setHidden(!hidden);
  };

  const { id } = useParams();

  const starRating = (rating) => {
      return (
        <div className="starRating-show">
          {[...Array(rating)].map((star, index) => (
            <FaStar
              key={index}
              className="star"
              size={20}
              color='yellow' 
            />
          ))}
        </div>
      );
  };

  console.log(review.rating);

  return (
    <div className="Review">
      {hidden ? (<ReviewForm reviewDetails={review} toggleView={toggleView} handleEdit={handleEdit} />) : (
        <>
          <div className="review-info-container">
            <h2 className="reviewer">{review.reviewer}</h2>


           <div className="title-score">
  <p className="review-title" style={{ "display": "inline-block", "marginRight": "5px" }}>
    {review.title} |
  </p>
  <div className="review-card-stars" style={{ "display": "inline-block"}}>
    {starRating(Number(review.rating))}
  </div>
</div>



            <div className="review-content">
              <p>
                {review.content}
              </p>
            </div>
          </div>
        </>
      )}
      <br />
      <div className="review-btns">
        {user?.id === review.user_id ? (
          <>
            <button className="delete" onClick={() => handleDelete(review.id)}>delete</button> <button className="edit" onClick={toggleView}>edit this review</button>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Review;
