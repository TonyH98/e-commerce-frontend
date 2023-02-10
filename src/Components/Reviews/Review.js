import ReviewForm from "./ReviewEdit"
import { useState } from "react";
import { Link , useParams} from "react-router-dom";
import ReadMore from "../ReadMore";
function Review({ review, handleDelete, handleEdit }) {
  const [hidden , setHidden] = useState(false)

  const toggleView = () => {
    setHidden(!hidden)
  }

  const {id} = useParams()


    return (
      <div className="Review">
        {hidden ? (<ReviewForm reviewDetails={review} toggleView={toggleView} handleEdit={handleEdit}/>) : (
          <>

          <h2 className="reviewer">{review.reviewer}</h2>
          <div className="title-score">
          <h4 className="review-title">
            <Link to={`/products/${id}/reviews/${review.id}`}>
            {review.title}
            </Link>
          </h4>
          <h4 className="rating">
          Rating: {review.rating}
          </h4>
          </div>


          <div className="review-content">
          <ReadMore>
          {review.content}
          </ReadMore>
          </div>
          </>
        )}
        <br></br>
        <div className="review-btns">
        <button  className="delete" onClick={() => handleDelete(review.id)}>delete</button> <button className="edit" onClick = {toggleView}>edit this review</button>
        </div>
      </div>
    );
  }
  
  export default Review;