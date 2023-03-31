import React from "react";
import { useNavigate , Link } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Product from "./Product"


const API = process.env.REACT_APP_API_URL;

const pageData = 1


function Home({products , setProducts, user}){
  
  const {CategoryData} = require("../CategoryImg/CategoryData")


  console.log(CategoryData)

  const [currentPage, setCurrentPage] = useState(0)

  const copy = [...products]

let navigate = useNavigate()


const number = 3;

const filter = copy 
.map(x => ({x, r: Math.random()}))
.sort((a , b) => a.r - b.r)
.map(a => a.x)
.slice(0 , number)


function handlePageChange ({selected: selectedPage}){
  setCurrentPage(selectedPage)
}

const offSet = currentPage * pageData



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
    navigate(`/`)
  })
  .catch((c) => console.warn("catch", c));
};



const currentPageData = filter
.slice(offSet, offSet + pageData)
 .map((product , index) => <Product
  key={index} product={product} index={index} handleEdit={handleEdit} user={user}/>)


  const pageCount =  Math.ceil(filter.length/pageData) 



return (
  <div>
    <div className="landing-page">
      
      <p style={{fontWeight: "bold", fontSize: "30px" , textAlign:"center"}}>Featured Items</p>
        <div className="products">
        {currentPageData}
        </div>
        <div className="page-count">
          { 
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
            } 
          </div>
    </div>
    <br></br>
    <br></br>
         
        <div className="category-section">
          {CategoryData.map((category) => {
            return(
              <div className="category-container">
               <img
               src={category.image}
            alt={category.name}
            className="category-images"
          ></img>
          <div className="collection-name">{category.name} Collection:</div>
          
          <div className="category-description">{category.description}</div>

          <Link to={category.link}>
          <button className="category-buttons">Shop Now</button>

          </Link>
              </div>
            )
          })}
        </div>
        
  </div>
  );
}

export default Home