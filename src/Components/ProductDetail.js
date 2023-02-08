import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Reviews from "./Reviews";

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

      console.log(product)
      console.log(id)
    return(
        <div>
        <div className="details-wrapper md:flex">
          <div className="relative p-0 m-0">
            <img 
                src={product.image} 
                className="images"
                alt={`${product.product_name}`} 
              />
          </div>
          <section className="info">
              <div>
                  <p>
                    {product.product_name}
                  </p>
              </div>
              <div>
                <p>
                    ${product.price}
                </p>
              </div>
              <div>
                <p>
                  {product.description}
                </p>
              </div>
              <div>
                <p>{product.manufacturer}</p>
              </div>
          </section>
        </div>
        <Reviews/>
    </div>
    )
}

export default ProductDetails