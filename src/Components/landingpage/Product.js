import { Link } from "react-router-dom";
import axios from "axios";
import ReadMore from "../ReadMore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Product(props){
 
  const [userCart , setUserCart] = useState([]);
  const [newCart , setNewCart] = useState([]);

  let navigate = useNavigate();

  function addToUser(){

    if(props.user?.id){
      axios
        .post(`${API}/users/${props.user?.id}/products/${props.product.id}`)
        .then(() => {
          navigate("/");
        })
      props.handleEdit({ ...props.product, quantity: Number(props.product.quantity) + 1 });
    }

    else{
    navigate("/login")
    }
  }

  useEffect(() => {
    if (props.user) {
      axios
        .get(`${API}/users/${props.user?.id}/products`)
        .then((res) => {
          setUserCart(res.data);
          setNewCart(res.data);
        })
        .catch((c) => console.warn("catch, c"));
    }
  }, [props.product.id, props.user]);

  console.log(userCart);

  const deleteCartItem = ( id, ids) => {
    axios
      .delete(`${API}/users/${id}/products/${ids}`)
      .then((res) => {
        const indexDeleteCart = userCart.findIndex((cart) => {
          return cart.products_id === ids;
        });
        userCart.splice(indexDeleteCart , 1);
        setUserCart([...userCart]);
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
    props.handleEdit({ ...props.product, quantity: props.product.quantity = 0 });
  }

  const map = newCart.map((x) => {
    return x.product_name;
  })


  function addToSearchHistory(id, ids) {

    if (!id) {
      return;
    }

    axios.get(`${API}/users/${id}/search?products_id=${ids}`)
    .then(res => {
      const searchHistory = res.data;
      const latestSearch = searchHistory.length > 0 ? searchHistory[searchHistory.length - 1] : null;
      if (latestSearch && latestSearch.products_id === ids) {
        return;
      }
      axios.post(`${API}/users/${id}/search/${ids}`)
      .then(() => {
        const uniqueSearchHistory = [...searchHistory, { products_id: ids }].filter((search, index, array) => {
          return search.products_id === ids && index === array.findIndex(s => s.products_id === ids);
        });
        if (uniqueSearchHistory.length > 1) {
          const deletePromises = uniqueSearchHistory.slice(0, -1).map(search => {
            return axios.delete(`${API}/users/${id}/search/${search.id}`);
          });
          Promise.all(deletePromises).catch(err => {
            console.log(err);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
  









  return(
    <div className="landing-products">

      <div>
        <Link to={`/products/${props.product.id}`}   onClick={() => addToSearchHistory(props.user?.id , props.product.id)}>
          <img
            src={props.product.image}
            alt={props.product.product_name}
            className="images"
          ></img>
        </Link>
      </div>

      <div>
        <h1 className="product-name">
          <Link to={`/products/${props.product.id}`}   onClick={() => addToSearchHistory(props.user?.id , props.product.id)}
          >{props.product.product_name}</Link>
        </h1>
        <p><span style={{fontWeight: "bold"}}>Price:</span>  ${props.product.price} </p> 

        <div style={{fontWeight:"bold", fontSize:"20px"}}>
          <ReadMore>
            {`${props.product.description}`}
          </ReadMore>
        </div>

        <br></br>
        {props.user && map.includes(props.product.product_name) ? (
          <button className="cart-btns" onClick={() => {deleteCartItem(props.user?.id , props.product.id)}}>
            Delete from Cart
          </button>
        ) : (
          <button className="cart-btns" onClick={() => {addToUser()}}>
            Add to Cart
          </button>
        )}
      </div> 
    </div>
  )
}

export default Product;
