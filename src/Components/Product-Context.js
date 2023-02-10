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

let favorite = {}

const GetFavorite = () => {
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
    favorite[i] = false
  }

  return favorite;
};


export const ProductContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(GetDefaultCart());

  const [getFavorite , setGetFavorite] = useState(GetFavorite())
  

  const TotalCart = () => {
    let total = 0;

    const [products , setProducts] = useState([])

    useEffect(() => {
      axios
        .get(`${API}/products`)
        .then((res) => {
          setProducts(res.data);
       
        })
        .catch((c) => console.warn("catch, c"));
    }, []);


    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        total += cartItems[item] * itemInfo.price;
      }
    }
    return total;
  };


  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Number(prev[itemId]) + 1 }));
  };

  const removeCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Number(prev[itemId]) - 1 }));
  };


const updateCounter = (newAmount , itemId) => {
  setCartItems((prev) => ({...prev, [itemId]: newAmount}))
}
 
 const favoriteCart = (itemId) => {
    setGetFavorite((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const contextValue = {
    cartItems,
    addToCart,
   removeCart,
   updateCounter,
   TotalCart,
   favoriteCart,
   getFavorite
  };



  console.log(getFavorite)

  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};