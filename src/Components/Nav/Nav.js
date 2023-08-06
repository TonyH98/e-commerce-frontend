import "./Nav.css"
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart} from "phosphor-react";

import {  MagnifyingGlass  } from "phosphor-react"
import { X } from "phosphor-react"

import axios from "axios";
import { useState, useEffect, useRef } from "react";


const API = process.env.REACT_APP_API_URL;


function Nav({isLogged}){
  
  const navigate = useNavigate();
  const [filterSearch, setFilterSearch] = useState([]);
  const [productSearch, setProductSearch] = useState([]);
  const [user, setUser] = useState();
  const [search, setSearch] = useState("");
  const [totalQuantity, setTotalQuantity] = useState([]);
let [quantity, setQuantity] = useState(null);
const totalQuantityRef = useRef(0); // Create a mutable reference


  useEffect(() => {
    
        const loggedUser = JSON.parse(window.localStorage.getItem('user'));
        setUser(loggedUser);
      
  }, [isLogged, navigate]);
  
  



  
  useEffect(() => {
  
      axios
        .get(`${API}/products`)
        .then((res) => {
          setProductSearch(res.data);
        })
        .catch((error) => {
          console.warn('Error fetching productSearch data:', error);
        });

    
  }, []); 


  function handleFilter(event) {
    let searchResult = event.target.value;
    setSearch(searchResult);
    const filter = productSearch.filter((product) => {
      return product.product_name.toLowerCase().includes(searchResult.toLowerCase());
    });
    if (searchResult === "") {
      setFilterSearch([]);
    } else {
      setFilterSearch(filter);
    }
  }

  function clear() {
    setFilterSearch([]);
    setSearch("");
  }

  function addToSearchHistory(id, ids) {
    if (!id) {
      return;
    }
    axios.post(`${API}/users/${id}/search/${ids}`);
  }



useEffect(() => {
  if (user) {
    axios
      .get(`${API}/users/${user?.id}/products`)
      .then((res) => {
        setTotalQuantity(res.data);
        if (res.data.length) {
          let quantity = 0;
          res.data.forEach((item) => {
            quantity += item.quantity;
          });
          setQuantity(quantity);
          console.log(quantity);
        } else {
          setQuantity(0);
          console.log(quantity);
        }
      })
      .catch((error) => {
        console.warn("Error fetching data:", error);
      });
  }
}, [user, totalQuantity]);




 console.log(totalQuantity)

    return( 
      <nav>
        <div className="Navigation">
      
         <div className="nav-1">
          
         <Link to="/">
         
         <h1 className="site-name" >Collection Vault</h1>
         </Link>

         <div className="nav-category">

          <Link to="/videogames">
          <div className="category-link">
            Video Games
          </div>
          </Link>

          <Link to="/mangas">
          <div className="category-link">
           Manga
          </div>
          </Link>


          <Link to="/comics">
          <div className="category-link">
           Comics
          </div>
          </Link>


         </div>


         </div>
        
        <div className="nav-2">

      <div className="search">
         <div className="searchInputs">
           <input 
           type="text"
           placeholder="Search..."
           value={search}
           onChange={handleFilter} 
           className="searchbar"/>
           <div className="searchIcon">{filterSearch.length === 0 ? <MagnifyingGlass size={25} color="white"/>: <X  onClick={clear} size={25} color="white"className="clear-bar"/>}</div>
         </div>
         {filterSearch.length !== 0 &&(
      
         <div className="dataResult">
           {filterSearch.slice(0 , 10).map((product) => {
             return(
               <div className="search-link">
                 <br></br>
               <Link to={`/products/${product.id}`} onClick={() => addToSearchHistory(user?.id , product.id)}>
               <p className="dropdown-link">{product.product_name}</p>
               </Link>
               </div>
               
             )
           })}
         </div>
         )}
      </div>



        </div>

           <div className="nav-3">
        {user ? (
          <Link to={`/cart/${user?.id}`}>
            <div>

            <ShoppingCart size={30} color="white"/>
            {quantity}
            </div>
          </Link>
        ) : (
          <Link to={`/login`}>
            <div>

                <ShoppingCart size={30} color="white"/>
            </div>
          </Link>
        )}

          <div className="user-login">

            {user ? (
              <Link to={`/userDetails/${user?.id}`}>

              <div className="user">
                {user?.username}
              </div>
              </Link>
            ): (

              <Link to="/login">
              <div className="user">
                Login
              </div>
              
              </Link>
            )}
          </div>

           </div>
     

      </div>


      </nav>

)
}

export default Nav