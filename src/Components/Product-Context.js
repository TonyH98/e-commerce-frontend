import { createContext, useEffect, useState } from "react";

import axios from "axios";
const API = process.env.REACT_APP_API_URL

export const ProductContext = createContext(null);

let cart = {};
const GetDefaultCart = () => {
  const [products , setProducts] = useState([])



  useEffect(() => {
    axios
      .get(`${API}/products`)
      .then((res) => {
        setProducts(res.data);
     
      })
      .catch((c) => console.warn("catch, c"));
  }, []);


  for (let i = 1; i < products.length + 1; i++) {
    cart[i] = 0
  }

  return cart;
};





export const ProductContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(GetDefaultCart());

  
  const TotalCart = () => {
    let total = 0
    const [products , setProducts] = useState([])


    useEffect(() => {
      axios
        .get(`${API}/products`)
        .then((res) => {
          setProducts(res.data);
       
        })
        .catch((c) => console.warn("catch, c"));
    }, []);


    for(let item in cartItems){
      if(cartItems[item] > 0){
        let itemInfo = products.find((p) => 
          p.id === Number(item)
        )
        total += (cartItems[item] * itemInfo.price)
      }
    }
    return total

  }



  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Number(prev[itemId]) + 1 }));
  };

  const removeCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };


const updateCounter = (newAmount , itemId) => {
  setCartItems((prev) => ({...prev, [itemId]: newAmount}))
}
 


  const contextValue = {
    cartItems,
    addToCart,
   removeCart,
   updateCounter,
   TotalCart
  };


  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};