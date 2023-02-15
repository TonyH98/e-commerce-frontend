import Book from "./Book"
import { useState, useEffect } from "react";
import axios from "axios";



const API = process.env.REACT_APP_API_URL;

function Books(){


    const [products , setProducts] = useState([])

    useEffect(() => {
      axios
        .get(`${API}/products?category=Books`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((c) => console.warn("catch, c"));
    }, []);
  


    return(
        <div>
            <br></br>
        <div className="product-card">
            {products.map((book) => {
                return(
                    <div key={book.id}>
                        <Book book={book}/>
                    </div>
                )
            })}
        </div>
        </div>
    )
}

export default Books