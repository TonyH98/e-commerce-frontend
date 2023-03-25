import { useState, useEffect} from "react";

import axios from "axios"
import UserLink from "../UserInfo/UserLink"
import Searches from "./Searches";


const API = process.env.REACT_APP_API_URL;


function SearchHistories({user}){

    const [histories, setHistories] = useState([])

    useEffect(() => {
        axios
          .get(`${API}/users/${user?.id}/search`)
          .then((res) => {
            setHistories(res.data);
          })
          .catch((c) => console.warn("catch, c"));
      }, []);


      console.log(histories)



    return(
        <UserLink>
        <div>
            <div>
            <h1>Search History</h1>
            </div>
                <div className="product-card favorite-card">
                  {histories.map((product) => {
                        return(
                          <div key={product.products_id} className="product-card">
                            <Searches product={product}/>
                      </div>
                        )
                  })}
                </div>
        </div>
        </UserLink>
    )
}

export default SearchHistories