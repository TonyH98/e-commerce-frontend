import { useState, useEffect} from "react";

import { Link } from "react-router-dom";

import axios from "axios"


const API = process.env.REACT_APP_API_URL;

function SearchProduct({user}){

    const [histories, setHistories] = useState([])


    useEffect(() => {
        if(user){
            axios
              .get(`${API}/users/${user?.id}/search`)
              .then((res) => {
                setHistories(res.data);
                
              })
              .catch((c) => console.warn("catch, c"));
        }
        else{
            setHistories([])
        }
      }, [user]);

const firstThree = histories.slice(0,3).sort((a , b) => {
    return new Date(b.created) - new Date(a.created)
})

console.log(firstThree)

    return(
        <div className="relatedItem">
            {histories.length > 0 ? (
                firstThree.map((product) => {
                    return(
                        <div key={product.products_id}>
                <Link to={`/products/${product.products_id}`}> 
              <img 
                    src={product.image} 
                    className="related-image"
                    alt={`${product.product_name}`} 
                  />
               </Link> 
               <br></br>
               
               <p style={{fontWeight:"bold"}}>{product.product_name}</p>
              </div>
                    )
                })


            ) : null}
        </div>
    )
}

export default SearchProduct