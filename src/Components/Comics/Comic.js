import { Link } from "react-router-dom";

import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;


function Comic(props){


  let [newProduct] = useState({
    quantity: props.comic.quantity,
    image: props.comic.image,
    price: props.comic.price,
    product_name: props.comic.product_name,
    products_id: props.comic.id,
    users_id: props.user?.id
  })


  const [userCart , setUserCart] = useState([])

  const [newCart , setNewCart] = useState([])

  let navigate = useNavigate()



  let addToUser = (id , ids) => {

    if(id){
      axios
      .post(`${API}/users/${id}/products/${ids}`, newProduct)
      .then(() => {
        setNewCart([...userCart, {...newProduct}])
        setUserCart([...userCart, {...newProduct}])
        navigate("/comics")
      })
      
      
      props.handleEdit({ ...props.comic, quantity: Number(props.comic.quantity) + 1 })
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
    
    .catch((err) => {
      console.log(err)
      return err
    })
    props.handleEdit({ ...props.comic, quantity: props.comic.quantity = 0 })
  }

  function addToSearchHistory(id, comicId) {

    if (!id) {
      return;
    }

    axios.get(`${API}/users/${id}/search?products_id=${comicId}`)
    .then(res => {
      const searchHistory = res.data;
      const latestSearch = searchHistory.length > 0 ? searchHistory[searchHistory.length - 1] : null;
      if (latestSearch && latestSearch.products_id === comicId) {
        return;
      }
      axios.post(`${API}/users/${id}/search/${comicId}`)
      .then(() => {
        const uniqueSearchHistory = [...searchHistory, { products_id: comicId }].filter((search, index, array) => {
          return search.products_id === comicId && index === array.findIndex(s => s.products_id === comicId);
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
  
  const inCart = newCart ? newCart.map(cart => cart.product_name) : [];




    return(
      <div>
         
      <div>
      <Link to={`/products/${props.comic.id}`}  onClick={() => addToSearchHistory(props.user?.id , props.comic.id)}>
        <img
          src={props.comic.image}
          alt={props.comic.product_name}
          className="product-image"
        ></img>
      </Link>
      </div>

      <div>
      <h3>
        <Link to={`/products/${props.comic.id}`} onClick={() => addToSearchHistory(props.user?.id , props.comic.id)}>
          {props.comic.product_name}
          </Link>
      </h3>
      <span style={{fontWeight: "bold"}}>Price:</span> ${props.comic.price}
      <br></br>
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