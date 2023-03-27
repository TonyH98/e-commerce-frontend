
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
          .get(`${API}/users/${user?.id}/products`)
          .then((res) => {
            setProducts(res.data);
          })
          .catch((c) => console.warn("catch, c"));
      }, []);


      const handleEdit = (updatedCart) => {
        axios
          .put(`${API}/users/${user?.id}/products/${updatedCart.products_id}`, updatedCart)
          .then((response) => {
            const copyCartArray = [...products];
            const indexUpdatedCart = copyCartArray.findIndex((cart) => {
              return cart.products_id === updatedCart.products_id;
            });
            
            copyCartArray[indexUpdatedCart] = response.data;
            setProducts(copyCartArray);
          })
          .then(() => {
            navigate(`/cart/${user?.id}`)
          })
          .catch((c) => console.warn("catch", c))
          
      };
      
const map = products.map((x) => {
  if(x.cart_counter !== 0 ){
    return Number((x.quantity * x.price).toFixed(2))
  }
  else{
    return 0
  }
})


let sum = 0

for(let i = 0 ; i <map.length; i++){
  sum += Number(map[i])
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


let totalQuantity = 0

for(let i = 0; i < products.length; i++){
  totalQuantity += Number(products[i].quantity)
}



const handleDelete = (id) => {
  axios
    .delete(`${API}/users/${user?.id}/products/${id}`)
    .then(
      (response) => {
        const copyProductArray = [...products];
        const indexDeletedProduct = copyProductArray.findIndex((product) => {
          return product.products_id === id;
        });
        copyProductArray.splice(indexDeletedProduct, 1);
        setProducts(copyProductArray); // Update the reviews state array
      },
      (error) => console.error(error)
    )
    .catch((c) => console.warn("catch", c));
};




    return(
        <div>
            <div>
            <h1>Shopping Cart</h1>
            </div>
              <hr></hr>
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
                
                    return(
                      <div key={`${user?.id}-${product.products_id}`} className="product-card-section">
                        <CartItem product={product} handleEdit={handleEdit} user={user} handleDelete={handleDelete}/>
                
                  </div>
                    )
                   
                  })}
                </div>
            <div className="order-details">
                <h2>Order Summary</h2>
                <div className="product-quantity-price">

                <div>Total Items:</div>
              <div>{totalQuantity}</div>

                  </div>
                <br></br>
                <div className="products_summary">
                  {products.map((product) => {
                    return(
                      <div className="product-quantity-price">

                        <div>{product.product_name} x{product.quantity}: </div>

                          <div>${(Number(product.quantity) * Number(product.price)).toFixed(2)}</div>

                      </div>
                      
                    )
                  })}
                </div>
                <br></br>

                <hr></hr>
                  <div className="product-quantity-price">

                  <div>Grand Total:</div>
                  <div style={{color:"green"}}>${sum.toFixed(2)}</div>

                  </div>
            
                <br></br>
                <br></br>
           <StripeCheckout 
           stripeKey="pk_test_51McALmHgd5U2y6vdyJDBrouUoY8PTbvjURc8eRi1yc4ar5lN8PdgSZrt7EpBErloqHKgcv3uz2PLhUcjlBaxKnRh00HMEGjp7J"
            token={makePayment}
            shippingAddress
            billingAddress
            name="Purchase Cart"
            >
              <button className="cart-btns" >Checkout</button>
              
           </StripeCheckout>
            </div>
     
             </section>
              
              )}
        
        </div>
    )
  }
  
  export default ProductCart
  
  
  