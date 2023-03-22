import Manga from "./Manga"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CategoryHeading from "../CategoryHeading";
const API = process.env.REACT_APP_API_URL;


function Mangas({user, saveHistory}){

    const [products , setProducts] = useState([])

    let navigate = useNavigate()

    useEffect(() => {
      axios
        .get(`${API}/products?category=Anime/Manga`)
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
          navigate(`/mangas`)
        })
        .catch((c) => console.warn("catch", c));
      };


    return(
        <div>
          <CategoryHeading>
            Anime/Manga Section
          </CategoryHeading>
        <br></br>
    <div className="product-card">
        {products.map((manga) => {
            return(
                <div key={manga.id}>
                    <Manga manga={manga} handleEdit={handleEdit} user={user} saveHistory={saveHistory}/>
                </div>
            )
        })}
    </div>
    </div>
    )
}

export default Mangas