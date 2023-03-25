import { useState, useEffect} from "react";

import axios from "axios"
import UserLink from "../UserInfo/UserLink"
import Searches from "./Searches";
import { useNavigate } from "react-router-dom";


const API = process.env.REACT_APP_API_URL;


function SearchHistories({user}){

    const [histories, setHistories] = useState([])
    const [filterHistory, setFilterHistory] = useState([])
    const [search , setSearch] = useState("")

    let navigate = useNavigate()

    useEffect(() => {
        axios
          .get(`${API}/users/${user?.id}/search`)
          .then((res) => {
            setHistories(res.data);
            setFilterHistory(res.data)
          })
          .catch((c) => console.warn("catch, c"));
      }, []);




      const handleEdit = (updatedCart) => {
        axios
        .put(`${API}/products/${updatedCart.id}`, updatedCart)
        .then((response) => {
          const copyCartArray = [...histories];
          const indexUpdatedCart = copyCartArray.findIndex((cart) => {
            return cart.id === updatedCart.id;
          });
          copyCartArray[indexUpdatedCart] = response.data;
          setHistories(copyCartArray);
        })
        .then(() => {
          navigate(`/searchHistory/${user?.id}`)
        })
        .catch((c) => console.warn("catch", c));
      };



      
      function deleteMultiple() {
        const deletedProductIds = histories
          .filter((history) => history.selected)
          .map((history) => history.products_id);
      
        Promise.all(
          deletedProductIds.map((productId) =>
            axios.delete(`${API}/users/${user?.id}/search/${productId}`)
          )
        )
          .then(() => {
            const updatedHistories = histories.filter(
              (history) => !deletedProductIds.includes(history.products_id)
            );
            setHistories(updatedHistories);
            setFilterHistory(updatedHistories); // update filterHistory state
          })
          .catch((error) => console.error(error));
      }
     
// Filter function for handleTextChange function below
function filteredHistory(search) {
  return histories.filter((history) =>
    history.product_name.toLowerCase().match(search.toLowerCase())
  );
}

// Function that searchs through the snacks array for a match to the search
const handleTextChange = (e) => {
  const search = e.target.value;
  const result = search ? filteredHistory(search) : filterHistory;
  setHistories(result);
  setSearch(search);
};



    return(
        <UserLink>
        <div>
            <div>
            <h1>Search History</h1>
            <>
            <label htmlFor="search-history">Search:</label>
            <br></br>
            <input
            className="search-history"
            type="text"
            value={search}
            onChange={handleTextChange}
            />

          <button onClick={deleteMultiple}>Delete</button>
            </>
            </div>
                <div className="product-card favorite-card">
                  {histories.map((product) => {
                        return(
                          <div key={product.products_id} className="product-card">
                            <Searches product={product} user={user} handleEdit={handleEdit}/>
                      </div>
                        )
                  })}
                </div>
        </div>
        </UserLink>
    )
}

export default SearchHistories