import { Link } from "react-router-dom";

function Manga(props){
  const cartIncrease = () => {
    props.handleEdit({ ...props.manga, cart_counter: Number(props.manga.cart_counter) + 1 })
  };

    return(
        <div>
          <div>
          <Link to={`/products/${props.manga.id}`}>
            <img
              src={props.manga.image}
              alt={props.manga.product_name}
              className="product-image"
            ></img>
          </Link>
          </div>

          <div>
          <h3>
            <Link to={`/products/${props.manga.id}`}>{props.manga.product_name}</Link>
          </h3>
          <span style={{fontWeight: "bold"}}>Price:</span> ${props.manga.price}
          <br></br>
          <button className="cart-btns-category" onClick={cartIncrease}>Add to Cart</button>
          </div>  
        </div>

    )
}

export default Manga