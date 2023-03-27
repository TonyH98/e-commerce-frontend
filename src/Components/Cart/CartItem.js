import { Link } from "react-router-dom";
import { Trash } from "phosphor-react";
import axios from "axios";
import { useState, useEffect } from "react";


const API = process.env.REACT_APP_API_URL;

function CartItem(props) {
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/users/${props.user?.id}/products`)
      .then((res) => {
        setUserCart(res.data);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, [props.product.products_id, props.user?.id]);

  const cartIncrease = () => {
    const updatedProduct = { ...props.product, quantity: props.product.quantity += 1 };
    props.handleEdit(updatedProduct);
  };

  const cartDecrease = () => {
    const updatedProduct = { ...props.product, quantity: props.product.quantity -= 1 };
    props.handleEdit(updatedProduct);
  };


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

        <div>
          <h3 className="product-name">
            <Link to={`/products/${props.product.products_id}`}>{props.product.product_name}</Link>
          </h3>
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
      <button className="clear-cart" onClick={() => props.handleDelete(props.product.products_id)}>
        <Trash size={30}/>
      </button>
    </div>

    </section>
  );
}

export default CartItem;