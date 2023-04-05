
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { ShoppingCart} from "phosphor-react";



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
          .catch((c) => console.warn("catch", c))
          .finally(() => {
            navigate(`/cart/${user?.id}`)
          });
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

                <div>Total Items:</div>
              <div>{totalQuantity}</div>

                  </div>
                <br></br>
                <div className="products_summary">
                  {products.map((product) => {
                    return(
                      <div className="product-quantity-price" key={product.products_id}>

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

              </div>
            
                <br></br>
                <br></br>
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
  
  
  