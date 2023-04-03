import { useState, useEffect} from "react";

import axios from "axios"
import UserLink from "../UserInfo/UserLink"
import Searches from "./Searches";
import { Trash } from "phosphor-react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";


const API = process.env.REACT_APP_API_URL;

const pageData = 2

function SearchHistories({user}){

    const [histories, setHistories] = useState([])
    const [filterHistory, setFilterHistory] = useState([])
    const [search , setSearch] = useState("")

    const [currentPage, setCurrentPage] = useState(0)


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




      const sortByDate = (date) => {
        if (date === "") {
          setHistories([...filterHistory]);
        } else if (date === "Latest to Earliest") {
          const sort = [...filterHistory].sort((a, b) => {
            return new Date(b.created) - new Date(a.created);
          });
          setHistories(sort);
        } else if (date === "Earliest to Latest") {
          const sort = [...filterHistory].sort((a, b) => {
            return new Date(a.created) - new Date(b.created);
          });
          setHistories(sort);
        }
        setCurrentPage(0);
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
            setFilterHistory(updatedHistories);
          })
          .catch((error) => console.error(error));
      }
     

      function filteredHistory(histories, search) {
        return histories.filter((history) =>
          history.product_name.toLowerCase().match(search.toLowerCase())
        );
      }
      
      const handleTextChange = (e) => {
        const search = e.target.value;
        const result = search ? filteredHistory(filterHistory , search) : filterHistory;
        setHistories(result);
        setSearch(search);
        setCurrentPage(0); 
      };
      

      function handlePageChange ({selected: selectedPage}){
        setCurrentPage(selectedPage);
      }
      
      const offSet = currentPage * pageData;
      
      const currentHistories = search ? filteredHistory(histories, search) : histories;
      
      const pageCount = Math.ceil(currentHistories.length / pageData);



    return(
        <UserLink>
        <div>
        <button onClick={deleteMultiple} className="delete-trash"><Trash size={30}/></button>
            <div>
            <h1>Search History</h1>
            <>
            <label htmlFor="search-history" style={{fontWeight:"bold"}}>Search:</label>
            <br></br>
            <input
            className="search-history"
            type="text"
            value={search}
            onChange={handleTextChange}
            />

            </>
            </div>

          <select onChange={(e) => sortByDate(e.target.value)}>
            <option value="">Select</option>
            <option value="Latest to Earliest">Latest to Earliest</option>
            <option value="Earliest to Latest">Earliest to Latest</option>
          </select>
            <br></br>
                <div className="search-cart">
                
                {currentHistories.slice(offSet, offSet + pageData).map((product) => {
                  return(

                          <div className="search-section" key={product.products_id}>
                            <Searches product={product} user={user} />
                          </div>
                  )
                })}
                        
        
                </div>

                  <br></br>
          { 
          histories.length > 2 ? (
            <div className="page-count">
          <ReactPaginate
         previousLabel={"<"}
         nextLabel={">"}
         pageCount={pageCount}
         onPageChange={handlePageChange}
         containerClassName={"pagination"}
         previousLinkClassName={"pagination-link"}
         nextLinkClassName={"pagination-link"}
         pageClassName={"pageCount"}
         />  
            
          </div>
            
            ) : null}
        </div>
        </UserLink>
    )
}

export default SearchHistories