import Comic from "./Comic"
import { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function Comics(){
    
    const [products , setProducts] = useState([])

    useEffect(() => {
      axios
        .get(`${API}/products?category=Comics`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((c) => console.warn("catch, c"));
    }, []);



    
    return (
        <div>
        <br></br>
    <div className="product-card">
        {products.map((comic) => {
            return(
                <div key={comic.id}>
                    <Comic comic={comic}/>
                </div>
            )
        })}
    </div>
    </div>
    )
}

export default Comics