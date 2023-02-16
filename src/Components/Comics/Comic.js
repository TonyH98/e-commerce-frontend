import { Link } from "react-router-dom";


function Comic(props){

  const cartIncrease = () => {
    props.handleEdit({ ...props.comic, cart_counter: Number(props.comic.cart_counter) + 1 })
  };


    return(
        <div>
          <div>
          <Link to={`/products/${props.comic.id}`}>
            <img
              src={props.comic.image}
              alt={props.comic.product_name}
              className="product-image"
            ></img>
          </Link>
          </div>

          <div>
          <h3>
            <Link to={`/products/${props.comic.id}`}>{props.comic.product_name}</Link>
          </h3>
          <span style={{fontWeight: "bold"}}>Price:</span> ${props.comic.price}
          <br></br>
          <button className="cart-btns-category" onClick={cartIncrease}>Add to Cart</button>
          </div>  
        </div>

    )
}

export default Comic