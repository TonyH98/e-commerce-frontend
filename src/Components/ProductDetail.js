import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Reviews from "./Reviews";
import ReadMore from "./ReadMore";


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

console.log(`${product.description}`)


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
        <Reviews/>
    </div>
    )
}

export default ProductDetails