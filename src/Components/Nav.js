
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
    axios.post(`${API}/users/${id}/search/${ids}`)
}

console.log(user)

    return( 
      <nav>

        <div className="Navigation">
         
         <div className="nav-1">

         <Link to="/">
         
         <h1 className="site-name" >Collection Valut</h1>
         </Link>

         <div className="nav-category">

          <Link to="/videogames">
          <div>
            Video Games
          </div>
          </Link>

          <Link to="/mangas">
          <div>
           Manga
          </div>
          </Link>


          <Link to="/comics">
          <div>
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

           <div className="nav-3">
        {user ? (
          <Link to={`/cart/${user?.id}`}>
            <div>

            <ShoppingCart size={30} color="black"/>
            </div>
          </Link>
        ) : (
          <Link to={`/login`}>
            <div>

                <ShoppingCart size={30} color="black"/>
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