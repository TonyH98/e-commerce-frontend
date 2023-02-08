import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Product from "./Product"


const API = process.env.REACT_APP_API_URL;

function Home(){

    const [products , setProducts] = useState([])

    useEffect(() => {
        axios
          .get(`${API}/products`)
          .then((res) => {
            setProducts(res.data);
           
          })
          .catch((c) => console.warn("catch, c"));
      }, []);



return (
    <article className="flex flex-col justify-center items-center">
      <div className="sm:flex flex-wrap justify-center items-start m-2">
          {products.map((product) => {
            return(
                <div key={product.id}>
                    <Product product={product}/>
                </div>
            )
          })}
      </div>
    </article>
  );
}

export default Home