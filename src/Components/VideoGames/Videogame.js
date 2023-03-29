import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Videogame(props){
  
  let [newProduct] = useState({
    quantity: props.game.quantity,
    category: props.game.category,
    description: props.game.description,
    favorites: props.game.favorites,
    image: props.game.image,
    manufacturer: props.game.manufacturer,
    price: props.game.manufacturer,
    product_name: props.game.product_name,
    products_id: props.game.id,
    release_date: props.game.release_date,
    users_id: props.user?.id
  })
 
  const [userCart , setUserCart] = useState([])

  const [newCart , setNewCart] = useState()


  let navigate = useNavigate()


    let addToUser = (id , ids) => {
      axios
      .post(`${API}/users/${id}/products/${ids}`, newProduct)
      .then(() => {
        setNewCart([...userCart, {...newProduct}])
        setUserCart([...userCart, {...newProduct}])
        navigate("/videogames")
      })
      props.handleEdit({ ...props.game, quantity: Number(props.game.quantity) + 1 })
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
    props.handleEdit({ ...props.game, quantity: props.game.quantity = 0 })
  }
  
console.log(userCart)


function addToSearchHistory(id, gameId) {
  axios.get(`${API}/users/${id}/search?products_id=${gameId}`)
    .then(res => {
      const searchHistory = res.data;
      const latestSearch = searchHistory.length > 0 ? searchHistory[searchHistory.length - 1] : null;
      if (latestSearch && latestSearch.products_id === gameId) {
        return;
      }
      axios.post(`${API}/users/${id}/search/${gameId}`)
        .then(() => {
          const uniqueSearchHistory = [...searchHistory, { products_id: gameId }].filter((search, index, array) => {
            return search.products_id === gameId && index === array.findIndex(s => s.products_id === gameId);
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
        <Link to={`/products/${props.game.id}`} onClick={() => addToSearchHistory(props.user?.id , props.game.id)}>
          <img
            src={props.game.image}
            alt={props.game.product_name}
            className="product-image"
          ></img>
        </Link>
      </div>

      <div>
        <h2>
          <Link to={`/products/${props.game.id}`}>{props.game.product_name}</Link>
        </h2>
        <span style={{fontWeight: "bold"}}>Price:</span> ${props.game.price}
        <br></br>
        <br></br>
        {props.user && inCart.includes(props.game.product_name) ? 
          <button className="cart-btns-category" onClick={() => deleteCartItem(props.user?.id , props.game.id)}>Delete From Cart</button> :
          <button className="cart-btns-category" onClick={() => addToUser(props.user?.id , props.game.id)}>Add to Cart</button>
        }
      </div>  
    </div>



    )
}

export default Videogame