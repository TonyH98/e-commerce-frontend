import { Link } from "react-router-dom";

function CartItem(props){

  

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