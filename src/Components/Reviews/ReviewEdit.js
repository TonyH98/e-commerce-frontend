import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {FaStar} from 'react-icons/fa'
import { GrItalic } from "react-icons/gr";
import {GrBold} from "react-icons/gr"
import axios from "axios";


const API = process.env.REACT_APP_API_URL;
function ReviewForm(props) {
  let { id } = useParams();
  const { reviewDetails } = props;

  const [review, setReview] = useState({
    reviewer: "",
    title: "",
    content: "",
    image: "",
    rating: "",
    user_id: "",
    product_id: id,
  });

  const handleTextChange = (event) => {
    if (event.target.name !== "rating" || event.target.name !== "image") {
      setReview({ ...review, [event.target.id]: event.target.value });
    } 
    if(event.target.name === "image"){
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        setReview({...review, image: reader.result})
      }
      reader.readAsDataURL(file)
    }
    
    else if(event.target.name === "rating"){
      // Update the selected rating when a star is clicked
      const selectedRating = Number(event.target.value);
      setReview({ ...review, rating: selectedRating });
    }
  };

  const handleFormateButtonClick = (format) => {
        const contentElement = document.getElementById("content");
        const start = contentElement.selectionStart;
        const end = contentElement.selectionEnd;
        const selectedText = review.content.substring(start, end);
        let formatText = review.content;
    
        switch (format) {
          case "Bold":
            formatText =
              formatText.substring(0, start) +
              `**${selectedText}**` +
              formatText.substring(end);
            break;
          case "Italic":
            formatText =
              formatText.substring(0, start) +
              `*${selectedText}*` +
              formatText.substring(end);
            break;
          default:
            break;
        }

        
        setReview({ ...review, content: formatText });
      };


  useEffect(() => {
    if (reviewDetails) {
      setReview(reviewDetails);
    }
  }, [id, reviewDetails, props]);
  
  const handleClearImage = () => {
    const newKey = Date.now(); // Generate a new key to trigger a re-render
    setReview({ ...review, image: null, imageKey: newKey });
  };
  


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", review.title);
    formData.append("content", review.content);
    formData.append("rating", review.rating);
    formData.append("image", review.image);
    formData.append("product_id", id);
    formData.append("reviewer", review?.reviewer);
    formData.append("user_id", review.user_id)

    axios.put(`${API}/products/${id}/reviews/${review.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    if (reviewDetails) {
      props.toggleView();
    }
  };

  return (



    <div >
  <form onSubmit={handleSubmit} className="review-form review-edit-form">
  
    <label htmlFor="title" className='label-signup'>Title:
    <input
      id="title"
      type="text"
      className="review-input"
      required
      value={review.title}
      onChange={handleTextChange}
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
        <div className="formatting-button-container">
        <button className="formatting-buttons" onClick={(e) => {e.preventDefault(); handleFormateButtonClick("Bold");}}><GrBold color="white" size={20}/></button>

        <button className="formatting-buttons" onClick={(e) => {e.preventDefault();handleFormateButtonClick("Italic"); }}><GrItalic color="white" size={20}/></button>
        </div>
        </label>

        <label htmlFor="image" className='label-signup'>
          Review Image
          <input
            key={review.imageKey}
            id="image"
            name="image"
            type="file"
            className="file-input"
            accept=".png, .jpg, .jpeg"
            onChange={handleTextChange}
          />
        </label>

        {review.image ? (
          <button onClick={(e) => { e.preventDefault(); handleClearImage(); }} className="remove-image-button">Clear Image</button>

        ):null}




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