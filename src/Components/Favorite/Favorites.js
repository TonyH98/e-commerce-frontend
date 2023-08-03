import Favorite from "./Favorite"
import { Trash } from "phosphor-react";
import axios from "axios"
import UserLink from "../UserInfo/UserLink"
import ReactPaginate from "react-paginate";
import "./Favorite.css"


import { useState, useEffect } from "react";


const API = process.env.REACT_APP_API_URL;

const pageData = 3

function Favorites({user}){

const [fav , setFav] = useState([])

const [filterFav , setFilterFav] = useState([])

const [search , setSearch] = useState("")

const [currentPage, setCurrentPage] = useState(0)




useEffect(() => {
    axios
      .get(`${API}/users/${user?.id}/favorites`)
      .then((res) => {
        setFav(res.data);
        setFilterFav(res.data)
      })
      .catch((c) => console.warn("catch, c"));
  }, []);



  const sortByDate = (date) => {
    if (date === "") {
      setFav([...filterFav]);
    } else if (date === "Latest to Earliest") {
      const sort = [...filterFav].sort((a, b) => {
        return new Date(b.created) - new Date(a.created);
      });
      setFav(sort);
    } else if (date === "Earliest to Latest") {
      const sort = [...filterFav].sort((a, b) => {
        return new Date(a.created) - new Date(b.created);
      });
      setFav(sort);
    }
    setCurrentPage(0);
  };



  function deleteMultiple() {
    const deletedProductIds = fav
      .filter((fav) => fav.selected)
      .map((fav) => fav.products_id);
  
    Promise.all(
      deletedProductIds.map((productId) =>
        axios.delete(`${API}/users/${user?.id}/favorites/${productId}`)
      )
    )
      .then(() => {
        const updatedFav = fav.filter(
          (fav) => !deletedProductIds.includes(fav.products_id)
        );
        setFav(updatedFav);
        setFilterFav(updatedFav);
      })
      .catch((error) => console.error(error));
  }


  function filteredFav(fav, search) {
    return fav.filter((fav) =>
      fav.product_name.toLowerCase().match(search.toLowerCase())
    );
  }
  
  const handleTextChange = (e) => {
    const search = e.target.value;
    const result = search ? filteredFav(filterFav , search) : filterFav;
    setFav(result);
    setSearch(search);
    setCurrentPage(0); 
  };

  function handlePageChange ({selected: selectedPage}){
    setCurrentPage(selectedPage);
  }
  
  const offSet = currentPage * pageData;
  
  const currentFav = search ? filteredFav(fav, search) : fav;
  
  const pageCount = Math.ceil(currentFav.length / pageData);

  
console.log(fav)


    return(
        <UserLink>
              <div>
                <div className="title-trash">

            <h1 className="user-section-header">Favorite Items</h1>
              <button onClick={deleteMultiple} className="delete-trash"><Trash size={30} color="white"/></button>

              
                </div>

              <section className="userLink-filter-container">

            <div>
           
            <label htmlFor="search-history" style={{fontWeight:"bold"}}>Search:</label>
         
            <input
            className="search-history"
            type="text"
            value={search}
            onChange={handleTextChange}
            />
  
            </div>

          <div>

          <select onChange={(e) => sortByDate(e.target.value)} >
            <option value="">Select</option>
            <option value="Latest to Earliest">Latest to Earliest</option>
            <option value="Earliest to Latest">Earliest to Latest</option>
          </select>

          </div>


              </section>


            <br></br>
                <div className="search-cart">
                
                {currentFav.slice(offSet, offSet + pageData).map((product) => {
                  return(

                          <div className="search-section" key={product.products_id}>
                            <Favorite product={product} user={user} />
                          </div>
                  )
                })}
                        
        
                </div>

                  <br></br>
          { 
          fav.length > 3 ? (
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

export default Favorites