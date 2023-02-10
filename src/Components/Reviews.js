import axios from "axios";
import { useState, useEffect } from "react";
import { useParams , Link } from "react-router-dom";
import Review from "./Review";


const API = process.env.REACT_APP_API_URL;

function Reviews(){

    const [reviews, setReviews] = useState([]);
    const [filterReviews , setFilterReviews] = useState([])


    const { id } = useParams();
  
    useEffect(() => {
      axios.get(`${API}/products/${id}/reviews`)
      .then((res) => {
        setReviews(res.data)
        setFilterReviews(res.data)
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
              setFilterReviews(copyReviewArray);
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
            setFilterReviews(copyReviewArray);
          })
          .catch((c) => console.warn("catch", c));
      };
    

      const map = filterReviews.map((x) => {
        return x.rating
      })

      let average = 0

      for(let i = 0 ; i < map.length; i++){
        average += Number(map[i])
       
      }
      
 average = average/ map.length

 

function handleCategory(category){
        setFilterReviews(category)

      }  
      function filterScore(e){
        const filter = reviews.filter((r) => r.rating === e.target.value);
        
    if (e.target.value === ""){
            handleCategory(reviews)
          }
    else{
       handleCategory(filter)
      }
      }

      return (
        <section className="Reviews">
          <h2>Reviews</h2>
          <div className="review-data">
            <h2>Customer Reviews</h2>
            <p>Global Review Number: {map.length}</p>
            <p>Average Score: {map.length === 0 ? `No Reviews`: average.toFixed(2)} </p>
            <Link to={`/products/${id}/reviews/chart`}>
            Review Statistics
            </Link>
            <div className="category-filter">
        <label
            htmlFor="searchProduct"
          >
            Select Rating:
          </label>
          <select onChange={filterScore}>
            <option value="">Select All</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

        </div>


          </div>
          <Link to={`/products/${id}/new`}>
          <button className="create-review">Write a Review</button>
          </Link>
          {filterReviews.map((review) => (
            <Review key={review.id} review={review} handleDelete={handleDelete}handleEdit={handleEdit}/>
          ))}
        </section>
      );
}


export default Reviews