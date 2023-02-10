import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";




function Favorite(props){
   return (

    <section>
       
    <div>
      <Link to={`/products/${props.product.id}`}>
        <img
          src={props.product.image}
          alt={props.product.product_name}
          className="images"
        ></img>
      </Link>
      <div>
      <h5 className="product-name">
        <Link to={`/products/${props.product.id}`}>{props.product.product_name}</Link>
      </h5>
      <span style={{fontWeight: "bold"}}>Price:</span> ${props.product.price}
     
      </div>
    </div>
  
  </section>
   )


}


export default Favorite