import ReviewForm from "./ReviewEdit"
import { useState } from "react";
import ReadMore from "./ReadMore";
function Review({ review, handleDelete, handleEdit }) {
  const [viewEditForm , toggleEditForm] = useState(false)

  const toggleView = () => {
    toggleEditForm(!viewEditForm)
  }


    return (
      <div className="Review">
        {viewEditForm ? (<ReviewForm reviewDetails={review} toggleView={toggleView} handleEdit={handleEdit}/>) : (
          <>
          <h4>
            {review.title} <span>{review.rating}</span>
          </h4>
          <h5>{review.reviewer}</h5>
          <ReadMore>
          {review.content}
          </ReadMore>
          <button onClick={() => handleDelete(review.id)}>delete</button>
          </>
        )}
        <button onClick = {toggleView}>edit this review</button>
      </div>
    );
  }
  
  export default Review;