import axios from "axios";

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FaBookmark } from "react-icons/fa"
import { FaRegBookmark } from "react-icons/fa"


import Reviews from "./Reviews/Reviews";
import ReadMore from "./ReadMore";


const API = process.env.REACT_APP_API_URL;




function ProductDetails({user}){

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${API}/products?category=${product.category}`)
      .then((res) => setRelated(res.data))
      .catch((err) => console.error(err));
  }, [product.category]);

  function updateProduct(updatedProduct, id) {
    axios
      .put(`${API}/products/${id}`, updatedProduct)
      .then(() => navigate(`/products/${id}`))
      .catch((err) => console.error(err));
  }

  function handleFavorite() {
    const updatedProduct = { ...product, favorites: !product.favorites };
    setProduct(updatedProduct);
    updateProduct(updatedProduct, id);
  }

  function handleCart() {
    const updatedProduct = {
      ...product,
      cart_counter: product.cart_counter + (counter || 1),
    };
    setProduct(updatedProduct);
    updateProduct(updatedProduct, id);
  }

  function handleCart2() {
    const updatedProduct = { ...product, cart_counter: 0 };
    setProduct(updatedProduct);
    updateProduct(updatedProduct, id);
  }

  function handleDelete() {
    axios
      .delete(`${API}/users/${user?.id}/products/${product.id}`)
      .then(() => handleCart2())
      .catch((err) => console.error(err));
  }

  function addToUser() {
    axios
      .post(`${API}/users/${user?.id}/products/${product.id}`)
      .then(() => handleCart())
      .catch((err) => console.error(err));
  }




  function addToFavorite() {
    
    
    if (product.favorites) {
     
      axios.delete(`${API}/users/${user.id}/products/${product.id}`)
        .then(() => handleFavorite(false))
        .catch((err) => console.error(err));
    } else {

      axios.post(`${API}/users/${user.id}/products/${product.id}`)
        .then(() => handleFavorite(true))
        .catch((err) => console.error(err));
    }
  }

  const date = new Date(product.release_date)?.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const relatedItems = related
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);


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
          <br></br>
          </div>
      <div className="favorites-section">
          { 
            product.favorites ? (
              <>
              <button onClick={() => addToFavorite(product.id)} className="favorites-btn"> <FaBookmark size={25}/>  </button>
      
              </>
            ) : (
              <>
                <button onClick={ () => addToFavorite(product.id) } className="favorites-btn">  <FaRegBookmark size={25}/> </button>
 
              </>    
              )
            }
          </div>   
          <br></br>
          <div className="cart-counter-input">
            <input
            className="cart-input"
            type="number"
            value={counter}
            min="0"
            onChange={(e) => setCounter(e.target.value)}
            />
          </div>
         
      <br></br>
          <div className="cart">
            {product.cart_counter > 0 ? (
              <button className="cart-btns" onClick={() => handleDelete(product.id)}>Delete From Cart</button>

            ) : (

          <button className="cart-btns" onClick={() => addToUser(product.id)}>Add to Cart</button>
            )}
           

          </div>
<br></br>

      <h1>Related Products</h1>
     <div className="relatedItem">
      {relatedItems.map((relate) => {
        return(
          <div key={relate.id}>
            <Link to={`/products/${relate.id}`}> 
          <img 
                src={relate.image} 
                className="related-image"
                alt={`${relate.product_name}`} 
              />
           </Link> 
           <br></br>
           
           <p style={{fontWeight:"bold"}}>{relate.product_name}</p>
          </div>
        )
      })}
     </div>
     <br></br>
        <Reviews/>
    </div>
    )
}

export default ProductDetails