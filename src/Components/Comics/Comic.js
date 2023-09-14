import { Link } from "react-router-dom";

import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;


function Comic(props){

  const [userCart , setUserCart] = useState([])

  const [newCart , setNewCart] = useState([])

  let navigate = useNavigate()



  let addToUser = (id , ids) => {

    if(id){
      axios
      .post(`${API}/users/${id}/products/${ids}`)
      .then(() => {
        axios.get(`${API}/users/${props.user?.id}/products`)
        .then((res) => {
          setNewCart(res.data)
          setUserCart(res.data)
        })
      })
    }
    else{
      navigate("/login")
    }
    
  }


  function addToSearchHistory(id, comicId) {
    if (!id) {
      return;
    }
      axios.post(`${API}/users/${id}/search/${comicId}`)
  }



  useEffect(() => {
    if (props.user) {
      axios.get(`${API}/users/${props.user?.id}/products`)
      .then(res => {
        setUserCart(res.data);
        setNewCart(res.data);
      })
      .catch(err => console.log(err));
    } else {
      setNewCart([]);
    }
  }, [props.user?.id]);
  
  const inCart = Array.isArray(newCart) ? newCart.map(cart => cart.product_name) : [];




  return (
    <div className="product-info-container">
      <div>
        <Link to={`/products/${props.comic.id}`} onClick={() => addToSearchHistory(props.user?.id , props.comic.id)}>
          <img
            src={props.comic.image[props.comic.image.length - 1]?.image}
            alt={props.comic.product_name}
            className="product-image"
          ></img>
        </Link>
      </div>

      <div className="product-info">
        <h3 className="product-names">
          <Link to={`/products/${props.comic.id}`} onClick={() => addToSearchHistory(props.user?.id , props.comic.id)}>
            {props.comic.product_name}
          </Link>
        </h3>
        <p className="price">
          <span style={{fontWeight: "bold"}}>Price:</span> ${props.comic.price}
        </p>
        <br></br>
        <div className="button-container">
          {props.user && inCart.includes(props.comic.product_name) ? 
            <Link to={`/cart/${props.user?.id}`}>
<button className="cart-btns-category">View Cart</button> 

            </Link>
            :
            <button className="cart-btns-category" onClick={() => addToUser(props.user?.id , props.comic.id)}>Add to Cart</button>
          }
        </div>
      </div>  
    </div>
  );
  
  
}

export default Comic