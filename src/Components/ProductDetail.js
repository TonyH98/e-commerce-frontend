import axios from "axios";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    const [related , setRelated] = useState([])

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


      useEffect(() => {
        axios
          .get(`${API}/products?category=${product.category}`)
          .then((res) => {
            setRelated(res.data);
          })
          .catch((c) => console.warn("catch, c"));
      }, [id]);

      
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

  
  
  
  copyCart.cart_counter = ( product.cart_counter + 1 )

  setProduct(copyCart)
  
  updateProduct(copyCart , id)
notify()
}


const date = new Date(product.release_date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"2-digit"})




console.log(related)


 
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
                 <p style={{fontSize:"30px"}}> {product.product_name},  <span style={{fontSize: "15px" , color: "gray"}}>{date}</span></p> 
              </div>
              <div>
                <p>
                  <span style={{fontWeight: "bold"}}>Price:</span> ${product.price}
                </p>
              </div>
              <div className="product-description">
                 <ReadMore>
                 {`${product.description}`}
                </ReadMore> 

              </div>
              <div>
                <p> By: {product.manufacturer}</p>
              </div>
          </section>
          
          </div>
    
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
      
          <div className="cart">
          <button className="cart-btns" onClick={() => handleCart()}>Add to Cart</button>
          <ToastContainer />
          </div>
     
        <Reviews/>
    </div>
    )
}

export default ProductDetails