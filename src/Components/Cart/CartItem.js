import { Link } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;



function CartItem(props){

  const [userCart , setUserCart] = useState([])

  
  
  


  useEffect(() => {
    axios
      .get(`${API}/users/${props.user?.id}/products`)
      .then((res) => {
        setUserCart(res.data);
       
      })
      .catch((c) => console.warn("catch, c"));
  }, [props.product.id, props.user]);


const cartIncrease = (event) => {

  props.handleEdit({ ...props.product, [event.target.id]: Number(event.target.value) })

if(event.target.value == 0 ){
  axios
  .delete(`${API}/users/${props.user?.id}/products/${props.product.id}`)
  .then((res) => {

    const indexDeleteCart = userCart.findIndex((cart) => {
      return cart.products_id === props.product.id
    });
    userCart.splice(indexDeleteCart , 1)
    setUserCart([...userCart])
  })
.catch((err) => {
console.log(err)
return err
})

}


};


console.log(props.product.cart_counter)

    return(
        <section>
       
        <div>
          <Link to={`/products/${props.product.products_id}`}>
            <img
              src={props.product.image}
              alt={props.product.product_name}
              className="cart-images"
            ></img>
          </Link>
          <div>
          <h5 className="product-name">
            <Link to={`/products/${props.product.products_id}`}>{props.product.product_name}</Link>
          </h5>
          <span style={{fontWeight: "bold"}}>Price:</span> ${props.product.price}
         
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