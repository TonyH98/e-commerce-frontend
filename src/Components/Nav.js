
import { Link } from "react-router-dom";
import { ShoppingCart} from "phosphor-react";

import {  MagnifyingGlass  } from "phosphor-react"
import { X } from "phosphor-react"

import axios from "axios";
import { useState, useEffect } from "react";





const API = process.env.REACT_APP_API_URL;


function Nav({isLogged}){


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
      <nav>

        <div className="Navigation">
         
        <h1 className="home-page-link">
          <Link to="/">
          T-Commerce
          </Link>
        </h1>
        

      <div className="Nav-Category">

        <Link to="/videogames">
        <div className="product-category">Video Games</div>
        </Link>

        <Link to="/mangas">
        <div className="product-category">Manga</div>
        </Link>

        <Link to="comics">
        <div className="product-category">Comics</div>
        </Link>

      </div>


      <div className="dropdown">
        <button className="dropbtn"> {user ? user?.username :  <Link to="/login">
        Login
      </Link>}</button>
        <div className="items">

         {user ?  <div>
        <Link to={`/cart/${user?.id}`}>
        <ShoppingCart color="black" size={30}/>
        </Link>
          </div> : null }
      {user ? 
     <p style={{fontWeight:"bold"}}><Link to={`/userDetails/${user?.id}`}>Details</Link></p>
     :<div className="link-new">
      <Link to="/login">
        <h3> Login </h3>
      </Link>
      </div> }
         
        </div>
      </div>
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
      </nav>

)
}

export default Nav