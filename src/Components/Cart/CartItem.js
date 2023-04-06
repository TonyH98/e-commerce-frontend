import { Link } from "react-router-dom";
import { Trash } from "phosphor-react";


function CartItem(props) {
  

  

  const cartIncrease = () => {
    const updatedProduct = { ...props.product, quantity: props.product.quantity += 1 };
    props.handleEdit(updatedProduct);
  };

  const cartDecrease = () => {
    const updatedProduct = { ...props.product, quantity: props.product.quantity -= 1 };
    props.handleEdit(updatedProduct);
  };


  function deleteItem() {
      props.handleDelete(props.product.products_id);
  }


  return (
    <section className="product-box">
      

        <div className="image-link">
        <Link to={`/products/${props.product.products_id}`}>
          <img
            src={props.product.image}
            alt={props.product.product_name}
            className="cart-images"
          />
        </Link>

        </div>

        <div className="card-info">
          <h5 className="product-name">
            <Link to={`/products/${props.product.products_id}`}>{props.product.product_name}</Link>
          </h5>
          <span style={{ fontWeight: "bold" }}>Price:</span> ${props.product.price}
          <br></br>
          <br></br>

        <button onClick={cartDecrease}>-</button>
          <input
          
        min="1"
        value={props.product.quantity}
        className="count-number"
      />
      <button onClick={cartIncrease}>+</button>
        </div>
    <div>
      <br></br>
      <button className="clear-cart" onClick={deleteItem}>
        <Trash size={30}/>
      </button>
    </div>

    </section>
  );
}

export default CartItem;