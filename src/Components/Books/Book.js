import { Link } from "react-router-dom";

function Book(props){

  const cartIncrease = () => {
    props.handleEdit({ ...props.book, cart_counter: Number(props.book.cart_counter) + 1 })
  };



    return(
        <div>
          <div>
          <Link to={`/products/${props.book.id}`}>
            <img
              src={props.book.image}
              alt={props.book.product_name}
              className="product-image"
            ></img>
          </Link>
          </div>

          <div>
          <h3>
            <Link to={`/products/${props.book.id}`}>{props.book.product_name}</Link>
          </h3>
          <span style={{fontWeight: "bold"}}>Price:</span> ${props.book.price}
          <br></br>
          <button className="cart-btns-category" onClick={cartIncrease}>Add to Cart</button>
          </div>  
        </div>

    )
}

export default Book