import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Product from "./Product"


const API = process.env.REACT_APP_API_URL;

function Home(){

    const [products , setProducts] = useState([])
   const [filterProducts , setFilterProducts] = useState([])

    useEffect(() => {
        axios
          .get(`${API}/products`)
          .then((res) => {
            setProducts(res.data);
             setFilterProducts(res.data)
          })
          .catch((c) => console.warn("catch, c"));
      }, []);


      const map = products.map((x) => {
        return x.category
      })
      
      const category = [...new Set(map)]
      
      
      
      function handleCategory(category){
        setFilterProducts(category)

      }
      
      function filterCategory(e){
        const filter = products.filter((p) => p.category === e.target.value);
        
    if (e.target.value === ""){
            handleCategory(products)
          }
    else{
       handleCategory(filter)
      }
      }
      
      


return (
    <article className="flex flex-col justify-center items-center">
      <div className="sm:flex flex-wrap justify-center items-start m-2">
        <div>
        <label
            htmlFor="searchProduct"
          >
            Select Category:
          </label>
          <select onChange={filterCategory}>
            <option value="">Select All</option>
            {category.map((c) => {
                return(
                  <option value={c}>{c}</option>
                )
            })}
          </select>

        </div>
          {filterProducts.map((product) => {
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