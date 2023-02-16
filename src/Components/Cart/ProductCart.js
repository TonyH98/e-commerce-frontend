
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { ShoppingCart} from "phosphor-react";

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

const cartCounter = products.map((x) => { 
 return Number(x.cart_counter * x.price)
})


const every = cartCounter.every((x) => {
  return x === 0 
})


   
    return(
        <div>
            <div>
            <h1>Your Cart Items</h1>
            </div>

             <br></br>
             <br></br>

            {every ? (
                <div>
             <ShoppingCart color="black" size={100}/>
                No Item in Cart
                </div>
            ) : (
             <section className="cart-details">


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
            <div className="subtotal">

              <h2>Subtotal: ${sum.toFixed(2)}</h2>

                  <br></br>
                  <br></br>
              <button  className="cart-btns">Checkout</button>
         
            </div>
     
             </section>
              
            )}
        
        </div>
    )
}

export default ProductCart


