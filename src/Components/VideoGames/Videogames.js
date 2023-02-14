import Videogame from "./Videogame"
import { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;


function Videogames(){

    const [products , setProducts] = useState([])

    useEffect(() => {
      axios
        .get(`${API}/products`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((c) => console.warn("catch, c"));
    }, []);




    const games = products.filter((product) => {
        if(product.category === "Video Games"){
          return product
        }
      })

      console.log(games)



    return(
        <div>
            <br></br>
        <br></br>
    <div className="product-card">
        {games.map((game) => {
            return(
                <div key={game.id} className="product">
                    <Videogame game={game}/>
                </div>
            )
        })}
    </div>
    </div>
    )
}

export default Videogames