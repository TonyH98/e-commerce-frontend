import { Link } from "react-router-dom";

import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Manga(props){

  let [newProduct] = useState({
    quantity: props.manga.quantity,
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
     

        props.handleEdit({ ...props.manga, quantity: Number(props.manga.quantity) + 1 })
      
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
    props.handleEdit({ ...props.manga, quantity: props.manga.quantity = 0 })
  }
  

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


    return(
        <div>
         
          <div>
          <Link to={`/products/${props.manga.id}`}  onClick={() => addToSearchHistory(props.user?.id , props.manga.id)}>
            <img
              src={props.manga.image}
              alt={props.manga.product_name}
              className="product-image"
            ></img>
          </Link>
          </div>

          <div>
          <h3>
            <Link to={`/products/${props.manga.id}`} onClick={() => addToSearchHistory(props.user?.id , props.manga.id)}>
              {props.manga.product_name}
              </Link>
          </h3>
          <span style={{fontWeight: "bold"}}>Price:</span> ${props.manga.price}
          <br></br>
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