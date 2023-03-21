
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { ShoppingCart} from "phosphor-react";

import StripeCheckout from "react-stripe-checkout";

import axios from "axios";

const API = process.env.REACT_APP_API_URL;


function ProductCart({user}){

  
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
            navigate(`/cart/${user?.id}`)
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


const makePayment = token => {
  const body = {
    token,
    products
    
  }
const headers = {
  "Content-Type": "application/json"
}

return axios(`${API}/payment`, {
  method: "POST",
  headers,
  body: JSON.stringify(body)
}).then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err)
})

}



const clearCart = () => {

  const clear = products.filter((x) => {
    if(x.cart_counter !== 0){
      return x
    }
  })

for(let i = 0; i < clear.length; i++){
  handleEdit({...clear[i], cart_counter: clear[i].cart_counter = 0})
}

}

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
                        <CartItem product={product} handleEdit={handleEdit} user={user}/>
                
                  </div>
                    )
                   }
        
                  })}
                </div>
            <div className="subtotal">

              <h2>Subtotal: ${sum.toFixed(2)}</h2>

                  <br></br>
                  <br></br>
             <StripeCheckout 
             stripeKey="pk_test_51McALmHgd5U2y6vdyJDBrouUoY8PTbvjURc8eRi1yc4ar5lN8PdgSZrt7EpBErloqHKgcv3uz2PLhUcjlBaxKnRh00HMEGjp7J"
              token={makePayment}
              shippingAddress
              billingAddress
              name="Purchase Cart"
              >
                <button className="cart-btns" onClick={clearCart}>Checkout Product</button>
                
             </StripeCheckout>
            </div>
     
             </section>
              
            )}
        
        </div>
    )
}

export default ProductCart


