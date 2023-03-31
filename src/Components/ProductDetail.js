import axios from "axios";

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FaBookmark } from "react-icons/fa"
import { FaRegBookmark } from "react-icons/fa"


import Reviews from "./Reviews/Reviews";
import ReadMore from "./ReadMore";
import SearchProduct from "./History/searchProduct";

const API = process.env.REACT_APP_API_URL;




function ProductDetails({user}){

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
 
  
  let [counter, setCounter] = useState(1);
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


  function handleFavorite2() {
    const updatedProduct = { ...product, favorites: false };
    debugger;
    setProduct(updatedProduct);
    updateProduct(updatedProduct, id);
  }
  
  function addToFavorite() {
    const updatedProduct = { ...product, favorites: true };
    setProduct(updatedProduct);
  
    axios
      .post(`${API}/users/${user?.id}/favorites/${product.id}`)
      .catch((err) => console.error(err));
  }

  function deleteFromFavorite() {
    axios
    .delete(`${API}/users/${user?.id}/favorites/${product.id}`)
    .then(() => handleFavorite2())
    .catch((err) => console.error(err));
  }
  
  function addToUser() {

    if(user?.id){
      axios
        .post(`${API}/users/${user?.id}/products/${product.id}`)
        .then(() => handleCart())
        .catch((err) => console.error(err));
    }
    else{
      navigate("/login")
    }
  }
  
  

  function handleCart() {
    const updatedProduct = {
      ...product,
      quantity: product.quantity + (counter || 1),
    };
    setProduct(updatedProduct);
    updateProduct(updatedProduct, id);
  }








  function handleCart2() {
    const updatedProduct = { ...product, quantity: 0 };
    setProduct(updatedProduct);
    updateProduct(updatedProduct, id);
  }

  function handleDelete() {
    axios
      .delete(`${API}/users/${user?.id}/products/${product.id}`)
      .then(() => handleCart2())
      .catch((err) => console.error(err));
  }








  const date = new Date(product.release_date)?.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const relatedItems = related
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);


function counterIncrease(){
  setCounter(counter += 1)
}

function counterDecrease(){
  setCounter(counter -= 1)
  if(counter <0 ){
    setCounter(0)
  }
}


const buyNow = async () => {
  
  if(user){
    const lineItems = [{
    product_name: product.product_name,
    image: product.image,
     price: product.price,
     quantity: 1
    }]
    
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

  }
else{
  navigate("/login")
}


}


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
              <button onClick={() =>deleteFromFavorite(product.id)} className="favorites-btn"> <FaBookmark size={25}/>  </button>
      
              </>
            ) : (
              <>
                <button onClick={() =>addToFavorite(product.id)}  className="favorites-btn">  <FaRegBookmark size={25}/> </button>
 
              </>    
              )
            }
          </div>   
          <br></br>
          <div className="cart-counter-input">
            <button className="decrease-increase" onClick={counterDecrease}>-</button>
            <input
            className="cart-input"
            value={counter}
            />
            <button className="decrease-increase"  onClick={counterIncrease}>+</button>
          </div>
         
      <br></br>
          <div className="cart">
            {product.quantity > 0 ? (
              <button className="add-delete" onClick={() => handleDelete(product.id)}>Delete From Cart</button>

            ) : (

          <button className="add-delete" onClick={() => addToUser(product.id)}>Add to Cart</button>
            )}
           
              <br></br>
              <br></br>
          <button className="add-delete" onClick={buyNow}>Buy it Now</button>
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
        <Reviews user={user}/>

        <div className="user-search-history">
          <h2>Previous Searches</h2>
          <SearchProduct user={user}/>
        </div>
    </div>
    )
}

export default ProductDetails