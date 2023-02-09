import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Reviews from "./Reviews";
import ReadMore from "./ReadMore";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const API = process.env.REACT_APP_API_URL;




function ProductDetails(){

    const { id } = useParams();
    const [product , setProduct] = useState([])
   
    
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

const notify = () => {
  toast(`You added ${product.product_name} to your cart`)
}

    return(
        <div>
          <div className="product-details">
          <div className="image-container">
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


          <button className="cart-btns" onClick={notify}>Add to Cart</button>
          <ToastContainer />

          </div>
     
        <Reviews/>
    </div>
    )
}

export default ProductDetails