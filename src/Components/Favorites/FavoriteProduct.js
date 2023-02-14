
import { useState, useEffect } from "react";
import Favorite from "./Favorite";


import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function FavoriteProduct(){
    const [products , setProducts] = useState([])

    useEffect(() => {
        axios
          .get(`${API}/products`)
          .then((res) => {
            setProducts(res.data);
          })
          .catch((c) => console.warn("catch, c"));
      }, []);


    return(
        <div>
            <div>
            <h1>Your Favorite Items</h1>
            </div>
                <div className="product-card favorite-card">
                  {products.map((product) => {
                    if(product.favorites){
                        return(
                          <div key={product.id} className="product-card">
                            <Favorite product={product}/>
                      </div>
                        )
                    }
                  })}
                </div>
            
        </div>
    )
}

export default FavoriteProduct