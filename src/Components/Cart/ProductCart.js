
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { ShoppingCart} from "phosphor-react";

import "./Cart.css"

import axios from "axios";

const API = process.env.REACT_APP_API_URL;


function ProductCart({user}){

  console.log(user)
  
    const [products , setProducts] = useState([])

  let navigate = useNavigate()


    useEffect(() => {
        axios
          .get(`${API}/users/${user?.id}/products`)
          .then((res) => {
            setProducts(res.data);
          })
          .catch((c) => console.warn("catch, c"));
      }, [user]);


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
          .catch((c) => console.warn("catch", c))
          .finally(() => {
            navigate(`/cart/${user?.id}`)
          });
      };
      

const map = products?.map((x) => {
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
        setProducts(copyProductArray);
      },
      (error) => console.error(error)
    )
    .catch((c) => console.warn("catch", c))
    
};

const checkout = async () => {
  const lineItems = products.map((product) => {
    return {
      product_name: product.product_name,
      image: product.image,
      price: product.price,
      quantity: product.quantity,
    };
  });

  const response = await fetch(`${API}/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: lineItems,
    }),
  });

  const data = await response.json();

  if (data.url) {
    window.location.assign(data.url);
  }
  
  if (response.ok) {
    // Payment was successful, delete products from cart
    for (let i = 0; i < products.length; i++) {
      await axios.delete(`${API}/users/${user?.id}/products/${products[i].products_id}`);
    }
  } else {
    // Payment failed, handle error
    const errorData = await response.json();
    console.error(errorData);
    // display error message to user
  }

  if (response.ok) {
    for (let i = 0; i < products.length; i++) {
        await axios.post(`${API}/users/${user?.id}/purchases/${products[i].products_id}`, products[i]);
  }

  }
};




    return(
        <div>
            <div>
            <h1 className="cart-header">Shopping Cart</h1>
            </div>

             <br></br>
             <br></br>

            {every ? (
                <div className="shopping-cart">
             <ShoppingCart color="white" size={100}/>
                <span style={{color: "white"}}>Cart Empty</span>
                </div>
            ) : (
             <section className="cart-details">


                <div className="products-cart">

                  {products.map((product) => {
                
                    return(
                      <div key={`${product.products_id}`} className="product-card-section">
                        <CartItem product={product} handleEdit={handleEdit} user={user} handleDelete={handleDelete}/>
                
                  </div>
                    )
                   
                  })}
                </div>
            <div className="order-details">
              <div className="price-quantity">
                <h2>Order Summary</h2>
                <div className="product-quantity-price">

                <div style={{color: "white"}}>Total Items:</div>
              <div style={{color: "white"}}>{totalQuantity}</div>

                  </div>
               
                <hr></hr>
                  <div className="product-quantity-price">

                  <div style={{"fontWeight": "bold", color: "white"}}>Grand Total:</div>
                  <div style={{color:"green"}}>${sum.toFixed(2)}</div>

                  </div>

              </div>
                  <br/>
                <br/>
              <div className="cart-container">
              <button className="cart-btns" onClick={checkout}>Checkout</button>
              </div>
              
     
            </div>
     
             </section>
              
              )}
        
        </div>
    )
  }
  
  export default ProductCart
  
  
  