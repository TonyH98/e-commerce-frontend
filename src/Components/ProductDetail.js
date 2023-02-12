import axios from "axios";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "./Product-Context";
import { FaBookmark } from "react-icons/fa"
import { FaRegBookmark } from "react-icons/fa"


import Reviews from "./Reviews/Reviews";
import ReadMore from "./ReadMore";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const API = process.env.REACT_APP_API_URL;




function ProductDetails(){

    const { id } = useParams();
    const [product , setProduct] = useState([])

    let navigate = useNavigate();


    useEffect(() => {
        axios
          .get(`${API}/products/${id}`)
          .then((res) => {
            setProduct(res.data);
           
          })
          .catch((c) => {
            console.warn("catch", c);
          });
      }, [id]);


      const {addToCart} = useContext(ProductContext)

      const updateProduct = (updatedProduct, id) => {
        axios
          .put(`${API}/products/${id}`, updatedProduct)
          .then(() => navigate(`/products/${id}`))
          .catch(c => console.warn('catch', c));
    }



    const handleFavorite = () => {
      
      const copyProduct = {...product}

      copyProduct.favorites = !product.favorites

      setProduct(copyProduct)
      
 

      updateProduct(copyProduct, id)
    }


    const notify = () => toast(`You added ${product.product_name} to your cart`);



function handleCart(){

  let copyCart = {...product}

  
  // setProduct({...copyCart, cart_counter: copyCart.cart_counter + 1})
  
  copyCart.cart_counter = ( product.cart_counter + 1 )

  setProduct(copyCart)
  
  updateProduct(copyCart , id)

}

  //  function handleClick(){
  //     notify()
  //     addToCart(product.id)
  //   }


console.log(product.cart_counter)
 
    return(
      
        <div>
          <div className="product-details">
          <div className="image-container">
       <br></br>
            <img 
                src={product.image} 
                className="image"
                alt={`${product.product_name}`} 
              />
          </div>
          <section className="info">
              <div>
                  <h1>
                    {product.product_name}
                  </h1>
                  
              </div>
              <div>
                <p>
                  <span style={{fontWeight: "bold"}}>Price:</span> ${product.price}
                </p>
              </div>
                 <ReadMore>
                 {`${product.description}`}
                </ReadMore> 
              <div>
                <p> By: {product.manufacturer}</p>
              </div>
          </section>
          
          </div>
          <br></br>
          <br></br>
          <div className="favorites-section">
          { 
            product.favorites ? (
              <>
              <button onClick={handleFavorite} className="favorites-btn"> <FaBookmark size={25}/>  </button>
      
              </>
            ) : (
              <>
                <button onClick={ handleFavorite } className="favorites-btn">  <FaRegBookmark size={25}/> </button>
 
              </>    
              )
            }
          </div>
          <br></br>
          <div className="cart">
          
          <button className="cart-btns" onClick={handleCart}>Add to Cart</button>
          <ToastContainer />
          </div>
     
        <Reviews/>
    </div>
    )
}

export default ProductDetails