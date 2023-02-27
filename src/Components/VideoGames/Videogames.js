import Videogame from "./Videogame"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryHeading from "../CategoryHeading";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;


function Videogames({user , saveHistory}){

    const [products , setProducts] = useState([])

    let navigate = useNavigate()

    useEffect(() => {
      axios
        .get(`${API}/products?category=video+games`)
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
        navigate(`/videogames`)
      })
      .catch((c) => console.warn("catch", c));
    };


    return(
        <div>
          <CategoryHeading>
            Video Games Section
          </CategoryHeading>
            <br></br>
        <br></br>
    <div className="product-card">
        {products.map((game) => {
            return(
                <div key={game.id} className="product">
                    <Videogame game={game} handleEdit={handleEdit} user={user} saveHistory={saveHistory}/>
                </div>
            )
        })}
    </div>
    </div>
    )
}

export default Videogames