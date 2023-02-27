import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Videogame(props){
  
  let [newProduct] = useState({
    cart_counter: props.game.cart_counter,
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

  const [newCart , setNewCart] = useState([])


  let navigate = useNavigate()

  // const cartIncrease = () => {
    // };
    
    const map = newCart.map((x) => {
      return x.product_name
    })
    
    let addToUser = (id , ids) => {
      axios
      .post(`${API}/users/${id}/products/${ids}`, newProduct)
      .then(() => {
        setNewCart([...userCart, {...newProduct}])
        setUserCart([...userCart, {...newProduct}])
        navigate("/videogames")
      })
      props.handleEdit({ ...props.game, cart_counter: Number(props.game.cart_counter) + 1 })
  }
  useEffect(() => { 
    axios
      .get(`${API}/users/${props.user?.id}/products`)
      .then((res) => {
        setUserCart(res.data);
        setNewCart(res.data)
      })
    
  }, [ map.length ]);

  

  

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
    props.handleEdit({ ...props.game, cart_counter: props.game.cart_counter = 0 })
  }
  
    return(
        <div>
          <div>
          <Link to={`/products/${props.game.id}`} onClick={() => props.saveHistory(props.game)}>
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
          {map.includes(props.game.product_name) ? 
          <button className="cart-btns-category" onClick={() => deleteCartItem(props.user?.id , props.game.id)}>Delete From Cart</button> :
          <button className="cart-btns-category" onClick={() => addToUser(props.user?.id , props.game.id)}>Add to Cart</button>
          }
          </div>  
        </div>

    )
}

export default Videogame