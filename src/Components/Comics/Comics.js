import Comic from "./Comic"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryHeading from "../CategoryHeading";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function Comics(){
    
    const [products , setProducts] = useState([])


    let navigate = useNavigate()


    useEffect(() => {
      axios
        .get(`${API}/products?category=Comics`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((c) => console.warn("catch, c"));
    }, []);


    const handleEdit = (updatedCart) => {
        axios
        .put(`${API}/products/${updatedCart.id}`, updatedCart)
        .then((response) => {
          const copyCartArray = [...products];
          const indexUpdatedCart = copyCartArray.findIndex((cart) => {
            return cart.id === updatedCart.id;
          });
          copyCartArray[indexUpdatedCart] = response.data;
          setProducts(copyCartArray);
        })
        .then(() => {
          navigate(`/comics`)
        })
        .catch((c) => console.warn("catch", c));
      };



    
    return (
        <div>
          <CategoryHeading>
            Comic Book Section
          </CategoryHeading>
        <br></br>
    <div className="product-card">
        {products.map((comic) => {
            return(
                <div key={comic.id}>
                    <Comic comic={comic} handleEdit={handleEdit}/>
                </div>
            )
        })}
    </div>
    </div>
    )
}

export default Comics