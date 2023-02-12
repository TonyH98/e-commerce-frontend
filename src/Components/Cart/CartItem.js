import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL;

function CartItem(props){

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${API}/products/${props.product.id}/reviews`)
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




const cartIncrease = (event) => {
 

  
  props.handleEdit({ ...props.product, [event.target.id]: Number(event.target.value) })
};





    return(
        <section>
       
        <div>
          <Link to={`/products/${props.product.id}`}>
            <img
              src={props.product.image}
              alt={props.product.product_name}
              className="cart-images"
            ></img>
          </Link>
          <div>
          <h5 className="product-name">
            <Link to={`/products/${props.product.id}`}>{props.product.product_name}</Link>
          </h5>
          <span style={{fontWeight: "bold"}}>Price:</span> ${props.product.price}
          <p>Average Review: {map.length === 0 ? `No Reviews` : average.toFixed(2)}</p>
          </div>
        </div>
     
       
        <input 
        id="cart_counter"
        type="number"
        value={props.product.cart_counter} 
        onChange={cartIncrease}
        className="count-number"
        />
   
      </section>
    )
}


export default CartItem