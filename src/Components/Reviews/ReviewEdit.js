import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {FaStar} from 'react-icons/fa'


function ReviewForm(props) {
  let { id } = useParams();
  const { reviewDetails } = props;

  const [review, setReview] = useState({
    reviewer: "",
    title: "",
    content: "",
    rating: "",
    product_id: id,
  });

  const handleTextChange = (event) => {
    if (event.target.name !== "rating") {
      setReview({ ...review, [event.target.id]: event.target.value });
    } else if(event.target.name === "rating"){
      // Update the selected rating when a star is clicked
      const selectedRating = Number(event.target.value);
      setReview({ ...review, rating: selectedRating });
    }
  };

  useEffect(() => {
    if (reviewDetails) {
      setReview(reviewDetails);
    }
  }, [id, reviewDetails, props]);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleEdit(review, id);
    if (reviewDetails) {
      props.toggleView();
    }
  };

  return (
    <div >
        

    
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
  
  </form>


</div>
  );
}

export default ReviewForm;