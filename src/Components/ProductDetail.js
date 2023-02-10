import axios from "axios";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "./Product-Context";
import { FaBookmark } from "react-icons/fa"
import { FaRegBookmark } from "react-icons/fa"
import Reviews from "./Reviews";
import ReadMore from "./ReadMore";

const API = process.env.REACT_APP_API_URL;




function ProductDetails(){

    const { id } = useParams();
    const [product , setProduct] = useState([])
    const [favorite, setFavorite] = useState()
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


      const {addToCart , getFavorite} = useContext(ProductContext)

      const updateProduct = (updatedProduct, id) => {
        axios
          .put(`${API}/products/${id}`, updatedProduct)
          .then(() => navigate(`/products/${id}`))
          .catch(c => console.warn('catch', c));
    }

    const handleFavorite = () => {
      setFavorite(!favorite)
  
      const copyProduct = {...product}
      copyProduct.favorites = !product.favorites
      setProduct(copyProduct)
      
      updateProduct(copyProduct, id)
    }


console.log(product)

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
          <div className="cart">
          <button className="favorite-btns" onClick={handleFavorite}>Add to Favorites</button>
          <br></br>
          <br></br>
          <button className="cart-btns" onClick={() => addToCart(product.id)}>Add to Cart</button>
          
          </div>
     
        <Reviews/>
    </div>
    )
}

export default ProductDetails