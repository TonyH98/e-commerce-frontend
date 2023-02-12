
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";


import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function ProductCart(){
    const [products , setProducts] = useState([])

  let navigate = useNavigate()


    useEffect(() => {
        axios
          .get(`${API}/products`)
          .then((res) => {
            setProducts(res.data);
          })
          .catch((c) => console.warn("catch, c"));
      }, []);


      const handleEdit = (updatedCart) => {
        axios
          .put(`${API}/products/${updatedCart.id}`, updatedCart)
          .then((response) => {
            const copyCartArray = [...products];
            const indexUpdatedCart = copyCartArray.findIndex((cart) => {
              return cart.id === updatedCart.id;
            });
            copyCartArray[indexUpdatedCart] = response.data;
            setProducts(copyCartArray);
          })
          .then(() => {
            navigate(`/cart`)
          })
          .catch((c) => console.warn("catch", c));
      };
      
   
    return(
        <div>
            <div>
            <h1>Your Cart Items</h1>
            </div>
             
                <div className="products-cart">

                  {products.map((product) => {
                   if(product.cart_counter !== 0 ){
                    return(
                      <div key={product.id} className="product-card">
                        <CartItem product={product} handleEdit={handleEdit}/>
                
                  </div>
                    )
                   }
        
                  })}
                </div>
            
            
        
        </div>
    )
}

export default ProductCart