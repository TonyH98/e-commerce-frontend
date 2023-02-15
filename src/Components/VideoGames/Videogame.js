import { Link } from "react-router-dom";


function Videogame(props){
 
  const cartIncrease = () => {
    props.handleEdit({ ...props.game, cart_counter: Number(props.game.cart_counter) + 1 })
  };



    return(
        <div>
          <div>
          <Link to={`/products/${props.game.id}`}>
            <img
              src={props.game.image}
              alt={props.game.product_name}
              className="product-image"
            ></img>
          </Link>
          </div>

          <div>
          <h3>
            <Link to={`/products/${props.game.id}`}>{props.game.product_name}</Link>
          </h3>
          <span style={{fontWeight: "bold"}}>Price:</span> ${props.game.price}
          <br></br>
          <button className="cart-btns" onClick={cartIncrease}>Add to Cart</button>
          </div>  
        </div>

    )
}

export default Videogame