import { Link } from "react-router-dom";
import ReadMore from "../ReadMore";

function Product(props){
 
  const cartIncrease = () => {
    props.handleEdit({ ...props.product, cart_counter: Number(props.product.cart_counter) + 1 })
  };




  
    return(
        <div className="landing-products">

          <div>
          <Link to={`/products/${props.product.id}`}>
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
           <button className="cart-btns" onClick={cartIncrease}>Add to Cart</button>
          </div> 
        </div>

    )
}

export default Product