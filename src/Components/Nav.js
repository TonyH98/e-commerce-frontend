
import { Link } from "react-router-dom";
import { ShoppingCart, X } from "phosphor-react";
import { useState, useEffect } from "react";
import axios from "axios";



const API = process.env.REACT_APP_API_URL;

function Nav(){


  const [products , setProducts] = useState([])
  
  useEffect(() => {
    axios
      .get(`${API}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((c) => console.warn("catch, c"));
  }, []);


  
  const map = products.map((x) => {
    return(
      x.cart_counter
      )
    })
    
    let sum = 0

for(let i = 0 ; i < map.length; i++){
  sum += map[i]
}

    return(
        <nav className="Navigation">

        <h1 className="home-page-link">
          <Link to="/">
          <img src="/logo192.png" width="40"/> React Commerce
          </Link>
        </h1>

      <div className="dropdown">
        <button className="dropbtn"> User </button>
        <div className="items">

          <div>
        <Link to="/cart">
        <ShoppingCart color="black" size={30}/>
        {sum}
        </Link>
          </div>

        <h3>
          <Link to="/favorites">Favorite Items</Link>
        </h3>

      <div className="link-new">
      <Link to="/newProduct">
        <h3> Create New Product </h3>
      </Link>
      </div>

        </div>
      </div>

      </nav>
    )
}

export default Nav