import React, { useContext } from "react";
import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { ProductContext } from "../Product-Context";
import { ShoppingCart } from "phosphor-react";

import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function ProductCart(){
    const [products , setProducts] = useState([])

    useEffect(() => {
        axios
          .get(`${API}/products`)
          .then((res) => {
            setProducts(res.data);
          })
          .catch((c) => console.warn("catch, c"));
      }, []);

      const {cartItems} = useContext(ProductContext)

      
      const value = Object.values(cartItems)
    
      const every = value.every((x) => {
        return x == 0 
      })


    return(
        <div>
            <div>
            <h1>Your Cart Items</h1>
            </div>
              {every ? 
              <div>
              <ShoppingCart color="black" size={100}/>
                <div style={{fontWeight: "bold"}}>

              Your cart is empy
                </div>
              </div>
              :
              (
                
                <div className="products-cart">

                  {products.map((product) => {
                   if(cartItems[product.id] !==0){
                    return(
                      <div key={product.id} className="product-card">
                        <CartItem product={product}/>
                
                  </div>
                    )
                   }
        
                  })}
                </div>
              )
              }
        
        </div>
    )
}

export default ProductCart