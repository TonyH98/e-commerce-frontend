import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
    setReview({ ...review, [event.target.id]: event.target.value });
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
    <div className="Edit">
      {props.children}
      <form onSubmit={handleSubmit}>
        <h3>Edit Form</h3>
        <label htmlFor="reviewer" className='label-signup'>Name:</label>
        <br></br>
        <input
          id="reviewer"
          value={review.reviewer}
          type="text"
          onChange={handleTextChange}
          placeholder="Your name"
          required
        />
        <br></br>
        <label htmlFor="title" className='label-signup'>Title:</label>
        <br></br>
        <input
          id="title"
          type="text"
          required
          value={review.title}
          onChange={handleTextChange}
        />
        <br></br>
        <label htmlFor="content" className='label-signup'>Review:</label>
        <br></br>
        <textarea
          id="content"
          type="text"
          name="content"
          value={review.content}
          placeholder="What do you think..."
          onChange={handleTextChange}
        />
      <br></br>
        <label htmlFor="rating" className='label-signup'>Rating:</label>
        <br></br>
        <input
          id="rating"
          type="number"
          name="rating"
          className="rating"
          min="0"
          max="5"
          step="1"
          value={review.rating}
          onChange={handleTextChange}
        />
        <br />

        <input type="submit" />
      </form>
    </div>
  );
}

export default ReviewForm;