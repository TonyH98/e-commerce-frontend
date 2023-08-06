import { useState , useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { fontWeight } from "@mui/system";
import {FaStar} from 'react-icons/fa'
import {GrBold} from "react-icons/gr"
import { GrItalic } from "react-icons/gr";
const API = process.env.REACT_APP_API_URL;

function ReviewNewForm({user}){
  const [product , setProduct] = useState([])

  let { id } = useParams();

 let navigate = useNavigate();


let [review, setReview] = useState({
    reviewer: user?.username,
    title: "",
    content: "",
    image: null,
    rating: null,
    user_id: user?.id,
    product_id: id,
  });

  useEffect(() => {
    if (user?.id) {
      setReview((prevReview) => ({
        ...prevReview,
        user_id: user?.id,
        reviewer: user?.username
      }));
    }
  }, [user?.id]);



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


        
        
        
        
        
        const handleSubmit = (event) => {
          event.preventDefault();
          const formData = new FormData();
          formData.append("title", review.title);
          formData.append("content", review.content);
          formData.append("rating", review.rating);
          formData.append("image", review.image); 
      
          axios
            .post(`${API}/products/${id}/reviews`, formData)
            .then(
              (response) => {
                navigate(`/products/${id}`);
              },
              (error) => console.error(error)
            )
            .catch((c) => console.warn("catch", c)); 
      };


      console.log(review)
     
    return(
      <div >
        

        <h1>Review: {product.product_name}</h1>
      <form onSubmit={handleSubmit} className="review-form">
       
       
        <label htmlFor="title" className='label-signup'>Title:
        <input
          id="title"
          type="text"
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

        <label htmlFor="image"  className='label-signup'>
              Review Image
              <input
                id="image"
                name="image"
                type="file"
                accept=".png, .jpg, .jpeg"
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
      <Link to={`/products/${id}`}>
        Back
      </Link>
      </form>


    </div>
    )
}


export default ReviewNewForm