import { Link } from "react-router-dom";
import axios from "axios";
import ReadMore from "../ReadMore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Product(props){
 
const [userCart , setUserCart] = useState([])

const [newCart , setNewCart] = useState([])

let navigate = useNavigate()

  // const cartIncrease = () => {
    
  // };


function addToUser(){
  axios
  .post(`${API}/users/${props.user?.id}/products/${props.product.id}`)
  .then(() => {
    navigate("/")
  })
  props.handleEdit({ ...props.product, cart_counter: Number(props.product.cart_counter) + 1 })
}


useEffect(() => {
  axios
    .get(`${API}/users/${props.user?.id}/products`)
    .then((res) => {
      setUserCart(res.data);
      setNewCart(res.data)
    })
    .catch((c) => console.warn("catch, c"));
}, [props.product.id, props.user]);


const deleteCartItem = ( id, ids) => {
    axios
    .delete(`${API}/users/${id}/products/${ids}`)
    .then((res) => {

      const indexDeleteCart = userCart.findIndex((cart) => {
        return cart.products_id === ids;
      });
      userCart.splice(indexDeleteCart , 1)
      setUserCart([...userCart])
    })
.catch((err) => {
  console.log(err)
  return err
})
props.handleEdit({ ...props.product, cart_counter: props.product.cart_counter = 0 })
}

const map = newCart.map((x) => {
  return x.product_name
})


    return(
        <div className="landing-products">

          <div>
          <Link to={`/products/${props.product.id}`} onClick={() => props.saveHistory(props.product)}>
            <img
              src={props.product.image}
              alt={props.product.product_name}
              className="images"
            ></img>
          </Link>
          </div>

          <div>
          <h1 className="product-name">
            <Link to={`/products/${props.product.id}`}>{props.product.product_name}</Link>
          </h1>

        <div style={{fontWeight:"bold", fontSize:"20px"}}>
          <ReadMore>
         {`${props.product.description}`}

          </ReadMore>

        </div>
      
          <span style={{fontWeight: "bold"}}>Price:</span> ${props.product.price} 

          {map.includes(props.product.product_name) ? <button className="cart-btns"   onClick={() => {deleteCartItem(props.user?.id , props.product.id)}}>Delete from Cart</button>:
          
<button className="cart-btns" onClick={() => {addToUser()}}>Add to Cart</button>
          }
 
          </div> 
        </div>

    )
}





export default Product