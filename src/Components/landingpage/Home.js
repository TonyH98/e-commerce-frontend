import React from "react";
import { useNavigate , Link } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Product from "./Product"


const API = process.env.REACT_APP_API_URL;

const pageData = 1


function Home({products , setProducts}){
  









// let navigate = useNavigate()







// const handleEdit = (updatedCart) => {
//   axios
//   .put(`${API}/products/${updatedCart.id}`, updatedCart)
//   .then((response) => {
//     const copyCartArray = [...products];
//     const indexUpdatedCart = copyCartArray.findIndex((cart) => {
//       return cart.id === updatedCart.id;
//     });
//     copyCartArray[indexUpdatedCart] = response.data;
//     setProducts(copyCartArray);
//   })
//   .then(() => {
//     navigate(`/`)
//   })
//   .catch((c) => console.warn("catch", c));
// };

const copy = [...products]

const selectedProducts = copy.filter((ele) => {
  if(ele.product_name === "Metroid Dread" ||
   ele.product_name === "One Piece Vol 1" || ele.product_name === "Invincible Compendium Volume 1"){
     return ele
   }
})


console.log(selectedProducts)


return (
  <div>

    <div className="landing-page">

      <div className="landing-column">
        <h1 className="landing-header">Explore our collection</h1>
        <p className="category-description">
        Experience premium entertainment with our collection of Manga, Comic Books, 
        and Video Games.
         <br/>
        Choose from both physical and digital formats 
        <br></br>
        for a 
        superior entertainment experience.
        </p>
        <button className="category-buttons">Shop Now</button>
      </div>

      <div className="border-products">
       {selectedProducts.map((product) => {
         return(
           <img
           src={product.image}
           alt={product.product_name}
           className="selected-image"
           />
         )
       })}
      </div>

    </div>


  </div>
  );
}

export default Home
{/* <div className="landing-page">
  
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
     containerClassName={"paginations"}
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
    </div> */}