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


  const deleteCartItem = ( id, ids) => {
    axios
    .delete(`${API}/users/${id}/products/${ids}`)
    .then((res) => {
      
      const indexDeleteCart = userCart.findIndex((cart) => {
        return cart.products_id === ids;
      });
      userCart.splice(indexDeleteCart , 1)
      setUserCart([...userCart])
    })
    .then(() => {
      axios.get(`${API}/users/${props.user?.id}/products`)
      .then((res) => {
        setNewCart(res.data)
        setUserCart(res.data)
      })
    })
    .catch((err) => {
      console.log(err)
      return err
    })
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




    return(
      <div className="product-info-container">
         
      <div>
      <Link to={`/products/${props.comic.id}`}  onClick={() => addToSearchHistory(props.user?.id , props.comic.id)}>
        <img
          src={props.comic.image[0]?.image}
          alt={props.comic.product_name}
          className="product-image"
        ></img>
      </Link>
      </div>
<hr></hr>
      <div className="product-info-container">
      <h3 className="product-names">
        <Link to={`/products/${props.comic.id}`} onClick={() => addToSearchHistory(props.user?.id , props.comic.id)}>
          {props.comic.product_name}
          </Link>
      </h3>
      <p className="price">
      <span style={{fontWeight: "bold"}}>Price:</span> ${props.comic.price}
      </p>
      <br></br>
      {props.user && inCart.includes(props.comic.product_name) ? 
      <button className="cart-btns-category" onClick={() => deleteCartItem(props.user?.id , props.comic.id)}>Delete From Cart</button> :
      <button className="cart-btns-category" onClick={() => addToUser(props.user?.id , props.comic.id)}>Add to Cart</button>
    }
      </div>  
    </div>

    )
}

export default Comic