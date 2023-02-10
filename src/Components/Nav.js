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
        <Link to="/cart">
        <ShoppingCart color="black" size={30}/>
        </Link>
        {sum}
        <h2>
          <Link to="/favorites">Favorite Items</Link>
        </h2>

      <Link to="/newProduct">
        <button className="new-product">Create New Product</button>
      </Link>

      </nav>
    )
}

export default Nav