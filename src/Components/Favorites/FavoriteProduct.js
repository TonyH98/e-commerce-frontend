
import { useState, useEffect } from "react";
import Favorite from "./Favorite";
import UserLink from "../UserInfo/UserLink";

import axios from "axios";



const API = process.env.REACT_APP_API_URL;
function FavoriteProduct({user}){
    const [products , setProducts] = useState([])

    useEffect(() => {
        axios
          .get(`${API}/users/${user?.id}/favorites`)
          .then((res) => {
            setProducts(res.data);
          })
          .catch((c) => console.warn("catch, c"));
      }, []);


console.log(products)

    return(
      <UserLink>
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
      </UserLink>
    )
}

export default FavoriteProduct