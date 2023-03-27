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

  const cartIncrease = (event) => {
    const newCounter = Number(event.target.value);
    const updatedProduct = { ...props.product, quantity: newCounter };

    props.handleEdit(updatedProduct);

    // if (newCounter === 0) {
    //   axios
    //     .delete(`${API}/users/${props.user?.id}/products/${props.product.products_id}`)
    //     .then((res) => {
    //       const updatedCart = userCart.filter((cart) => cart.products_id !== props.product.products_id);
    //       setUserCart(updatedCart);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       return err;
    //     });
    // } else {
    //   const updatedCart = userCart.map((cart) => {
    //     if (cart.products_id === props.product.products_id) {
    //       return { ...cart, quantity: newCounter };
    //     } else {
    //       return cart;
    //     }
    //   });
    //   setUserCart(updatedCart);
    // }
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

          <input  
        id="quantity"
        min="1"
        type="number"
        value={props.product.quantity}
        onChange={cartIncrease}
        className="count-number"
      />

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