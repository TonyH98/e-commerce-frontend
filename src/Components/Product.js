import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL;

function Product({product}){

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${API}/products/${product.id}/reviews`)
    .then((res) => {
      setReviews(res.data)
      
    });
  }, []);


  const map = reviews.map((x) => {
    return x.rating
  })

console.log(reviews)



  let average = 0

  for(let i = 0 ; i < map.length; i++){
    average += Number(map[i])
   
  }
  
average = average/ map.length  


console.log(average)
    return(
        <section>
        <div>
          <Link to={`/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.product_name}
              className="images"
            ></img>
          </Link>
          <div>
          <h5 className="product-name">
            <Link to={`/products/${product.id}`}>{product.product_name}</Link>
          </h5>
          <span style={{fontWeight: "bold"}}>Price:</span> ${product.price}
          <p>Average Review: {map.length === 0 ? `No Reviews` : average.toFixed(2)}</p>
          </div>
        </div>
      </section>
    )
}

export default Product