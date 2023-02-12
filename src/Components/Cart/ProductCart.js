
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
      
const map = products.map((x) => {
  if(x.cart_counter !== 0 ){
    return Number((x.cart_counter * x.price).toFixed(2))
  }
  else{
    return 0
  }
})


let sum = 0

for(let i = 0 ; i <map.length; i++){
  sum += map[i]
}

console.log(sum)

   
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
                <br></br>
                <br></br>
            <div className="subtotal">
              <h2>Subtotal: ${sum}</h2>
            </div>
            
        
        </div>
    )
}

export default ProductCart