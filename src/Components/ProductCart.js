import React, { useContext } from "react";
import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { ProductContext } from "./Product-Context";
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


    return(
        <div>
            <div>
            <h1>Your Cart Items</h1>
            </div>
            <div className="products-cart">
          {products.map((product) => {
           if(cartItems[product.id] !==0){
            return(
                <CartItem product={product}/>
            )
           }
          })}
        </div>
        </div>
    )
}

export default ProductCart