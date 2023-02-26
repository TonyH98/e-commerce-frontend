import { Link } from "react-router-dom";

import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Manga(props){

  let [newProduct , setNewProduct] = useState({
    cart_counter: props.manga.cart_counter,
    category: props.manga.category,
    description: props.manga.description,
    favorites: props.manga.favorites,
    image: props.manga.image,
    manufacturer: props.manga.manufacturer,
    price: props.manga.manufacturer,
    product_name: props.manga.product_name,
    products_id: props.manga.id,
    release_date: props.manga.release_date,
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
        navigate("/mangas")
      })
     

        props.handleEdit({ ...props.manga, cart_counter: Number(props.manga.cart_counter) + 1 })
      
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
    props.handleEdit({ ...props.manga, cart_counter: Number(props.manga.cart_counter) - 1 })
  }
  
console.log(userCart)


    return(
        <div>
          <div>
          <Link to={`/products/${props.manga.id}`}>
            <img
              src={props.manga.image}
              alt={props.manga.product_name}
              className="product-image"
            ></img>
          </Link>
          </div>

          <div>
          <h3>
            <Link to={`/products/${props.manga.id}`}>{props.manga.product_name}</Link>
          </h3>
          <span style={{fontWeight: "bold"}}>Price:</span> ${props.manga.price}
          <br></br>
          {map.includes(props.manga.product_name) ? 
          <button className="cart-btns-category" onClick={() => deleteCartItem(props.user?.id , props.manga.id)}>Delete From Cart</button> :
          <button className="cart-btns-category" onClick={() => addToUser(props.user?.id , props.manga.id)}>Add to Cart</button>
          }
          </div>  
        </div>

    )
}

export default Manga