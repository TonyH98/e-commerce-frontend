import Manga from "./Manga"
import { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function Mangas(){

    const [products , setProducts] = useState([])

    useEffect(() => {
      axios
        .get(`${API}/products?category=Anime/Manga`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((c) => console.warn("catch, c"));
    }, []);


    // const manga = products.filter((product) => {
    //     if(product.category === "Anime/Manga"){
    //       return product
    //     }
    //   })


    return(
        <div>
        <br></br>
    <div className="product-card">
        {products.map((manga) => {
            return(
                <div key={manga.id}>
                    <Manga manga={manga}/>
                </div>
            )
        })}
    </div>
    </div>
    )
}

export default Mangas