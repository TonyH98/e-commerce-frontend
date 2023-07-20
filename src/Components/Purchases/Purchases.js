import { useState, useEffect} from "react";
import Purchase from "./Purchase"
import axios from "axios"
import { Trash } from "phosphor-react";
import UserLink from "../UserInfo/UserLink"


import ReactPaginate from "react-paginate";


const API = process.env.REACT_APP_API_URL;

const pageData = 3

function Purchases({user}){

    const [purchases, setPurchases] = useState([])
    const [filterPurchases, setFilterPurchases] = useState([])
    const [search , setSearch] = useState("")

    const [currentPage, setCurrentPage] = useState(0)




    useEffect(() => {
        axios
          .get(`${API}/users/${user?.id}/purchases`)
          .then((res) => {
            setPurchases(res.data);
            setFilterPurchases(res.data)
          })
         
      }, []);



      const sortByDate = (date) => {
        if (date === "") {
          setPurchases([...filterPurchases]); // create a copy
        } else if (date === "Latest to Earliest") {
          const sort = [...filterPurchases].sort((a, b) => {
            return new Date(b?.created) - new Date(a?.created);
          });
          setPurchases(sort);
        } else if (date === "Earliest to Latest") {
          const sort = [...filterPurchases].sort((a, b) => {
            return new Date(a?.created) - new Date(b?.created);
          });
          setPurchases(sort);
        }
        setCurrentPage(0)
      };
      



      function deleteMultiple() {
        const deletedProductIds = purchases
          .filter((purchase) => purchase.selected)
          .map((purchase) => purchase.products_id);
      
        Promise.all(
          deletedProductIds.map((productId) =>
            axios.delete(`${API}/users/${user?.id}/purchases/${productId}`)
          )
        )
          .then(() => {
            const updatedPurchases = purchases.filter(
              (purchase) => !deletedProductIds.includes(purchase.products_id)
            );
            setPurchases(updatedPurchases);
            setFilterPurchases(updatedPurchases);
          })
          .catch((error) => console.error(error));
      }




      function filteredPurchase(purchases, search) {
        return purchases.filter((purchase) =>
          purchase.product_name.toLowerCase().match(search.toLowerCase())
        );
      }
      
      const handleTextChange = (e) => {
        const search = e.target.value;
        const result = search ? filteredPurchase(filterPurchases , search) : filterPurchases;
        setPurchases(result);
        setSearch(search);
        setCurrentPage(0); 
      };




      function handlePageChange ({selected: selectedPage}){
        setCurrentPage(selectedPage);
      }
      
      const offSet = currentPage * pageData;
      
      const currentPurchase = search ? filteredPurchase(purchases, search) : purchases;
      
      const pageCount = Math.ceil(currentPurchase.length / pageData);




      


    return(
        <UserLink>
            <div className="user-index">
              <button onClick={deleteMultiple} className="delete-trash"><Trash size={30} color="white"/></button>
            <div>
            <h1 className="user-section-header">Purchase History</h1>
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
                
                {currentPurchase.slice(offSet, offSet + pageData).map((product) => {
                  return(

                          <div className="search-section" key={product.products_id}>
                            <Purchase product={product} user={user} />
                          </div>
                  )
                })}
                        
        
                </div>

                  <br></br>
          { 
          purchases.length > 3 ? (
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

export default Purchases