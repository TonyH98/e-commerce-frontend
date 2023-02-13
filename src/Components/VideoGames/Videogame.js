import { Link } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL;

function Videogame(props){
  const [reviews, setReviews] = useState([]);
  

  useEffect(() => {
    axios.get(`${API}/products/${props.game.id}/reviews`)
    .then((res) => {
      setReviews(res.data)
      
    });
  }, []);


  const map = reviews.map((x) => {
    return x.rating
  })





  let average = 0

  for(let i = 0 ; i < map.length; i++){
    average += Number(map[i])
   
  }
  
average = average/ map.length  




    return(
        <div>
          <div>
          <Link to={`/products/${props.game.id}`}>
            <img
              src={props.game.image}
              alt={props.game.product_name}
              className="product-image"
            ></img>
          </Link>
          </div>

          <div>
          <h3>
            <Link to={`/products/${props.game.id}`}>{props.game.product_name}</Link>
          </h3>
          <span style={{fontWeight: "bold"}}>Price:</span> ${props.game.price}
          </div>  
        </div>

    )
}

export default Videogame