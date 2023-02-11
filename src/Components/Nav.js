import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { ProductContext } from "./Product-Context";


function Nav(){

const {cartItems} = useContext(ProductContext)

const value = Object.values(cartItems)

let sum = 0 

for(let i = 0 ; i < value.length; i++ ){
  sum += value[i]
}



    return(
        <nav className="Navigation">

        <h1 className="home-page-link">
          <Link to="/">E-Commerce App</Link>
        </h1>






      <div className="dropdown">
        <button className="dropbtn"> Items </button>
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