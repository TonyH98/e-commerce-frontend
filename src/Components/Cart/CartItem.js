import { Link } from "react-router-dom";
import { Trash } from "phosphor-react";
import "./Cart.css"

function CartItem(props) {
  

  

  const cartIncrease = (event) => {
    const updatedProduct = { ...props.product, quantity: parseInt(event.target.value) };
    props.handleEdit(updatedProduct);
  };

  
  function deleteItem() {
      props.handleDelete(props.product.products_id);
  }


  return (
    <section className="product-box">
      
        {props.product.images?.length > 0 ? (

        <div className="image-link">
        <Link to={`/products/${props.product.products_id}`}>
          <img
            src={props.product.images[0]?.image}
            alt={props.product.product_name}
            className="cart-images"
          />
        </Link>

        </div>


        ) : null}

        <div className="card-info">
          <h5 className="product-name">
            <Link to={`/products/${props.product.products_id}`}>{props.product.product_name}</Link>
          </h5>
          <p>
          <span style={{ fontWeight: "bold", color: "white" }}>Price:</span> ${props.product.price}
          </p>

          <input
        type="number"
        min="1"
        value={props.product.quantity}
        className="cart-input"
        onChange={cartIncrease}
      />
     
        </div>
    <div>
      <br></br>
      <button className="clear-cart" onClick={deleteItem}>
        <Trash size={30} color="white"/>
      </button>
    </div>

    </section>
  );
}

export default CartItem;