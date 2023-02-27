
import { Link } from "react-router-dom";
import { ShoppingCart} from "phosphor-react";

import {  MagnifyingGlass  } from "phosphor-react"
import { X } from "phosphor-react"

import axios from "axios";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;


function Nav({isLogged , saveHistory}){

let navigate = useNavigate()


  let [filterSearch , setFilterSearch] = useState([])
  let [productSearch , setProductSearch] = useState([])
  const [user, setUser] = useState();

 let [search , setSearch] = useState("")


useEffect(() => {
  axios
  .get(`${API}/products`)
  .then((res) => {
    setProductSearch(res.data);
 
  })
  
  
},[])
 

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    setUser(loggedUser);
  }, [isLogged]);




function handleFilter(event){
  let searchResult = event.target.value
  setSearch(searchResult)
  const filter = productSearch.filter((product) => {
    return product.product_name.toLowerCase().includes(searchResult.toLowerCase())
  })

  if(searchResult === ""){
    setFilterSearch([])
  }
  else{
    setFilterSearch(filter)

  }
}

function clear(){
  setFilterSearch([])
  setSearch("")
}



    return(
        <nav className="Navigation">
         

        <h1 className="home-page-link">
          <Link to="/">
          T-Commerce
          </Link>
        </h1>
        
       <div className="search">
          <div className="searchInputs">
            <input 
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleFilter} 
            className="searchbar"/>
            <div className="searchIcon">{filterSearch.length === 0 ? <MagnifyingGlass size={25} />: <X  onClick={clear} size={25} className="clear-bar"/>}</div>
          </div>
          {filterSearch.length !== 0 &&(

          <div className="dataResult">
            {filterSearch.slice(0 , 10).map((product) => {
              return(
                <div className="search-link">
                  <br></br>
                <Link to={`/products/${product.id}`} onClick={() => saveHistory(product)}>
                <p className="dropdown-link">{product.product_name}</p>
                </Link>

                </div>
                
              )
            })}
          </div>
          )}
       </div>

      <div className="Nav-Category">

        <Link to="/books">
        <div className="product-category">Books</div>
        </Link>

        <Link to="/videogames">
        <div className="product-category">Video Games</div>
        </Link>

        <Link to="/mangas">
        <div className="product-category">Anime/Manga</div>
        </Link>

        <Link to="comics">
        <div className="product-category">Comics</div>
        </Link>

      </div>


      <div className="dropdown">
        <button className="dropbtn">User</button>
        <div className="items">
         
          <div>
        <Link to={`/cart/${user?.id}`}>
        <ShoppingCart color="black" size={30}/>
        </Link>
          </div>

        <h3>
          <Link to={`/favorites/${user?.id}`}>Favorite Items</Link>
        </h3>

      <div className="link-new">
      <Link to="/newProduct">
        <h3> Create New Product </h3>
      </Link>
      </div>

      <div className="link-new">
      <Link to="/login">
        <h3> Login </h3>
      </Link>

       
      </div>

        </div>
      </div>

      </nav>
    )
}

export default Nav