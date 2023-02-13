import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

import Product from "./Product"




const pageData = 1

function Home({products}){


  const [currentPage, setCurrentPage] = useState(0)

  const copy = [...products]

      
const filter = copy.filter((product) => {
  if(product.product_name === "Metroid Dread" || product.product_name === "One Piece Vol 1" || product.product_name === "Saga Vol 2"){
    return product
  }
})


function handlePageChange ({selected: selectedPage}){
  setCurrentPage(selectedPage)
}

const offSet = currentPage * pageData

const currentPageData = filter
.slice(offSet, offSet + pageData)
 .map((product , index) => <Product
  key={index} product={product} index={index}/>)


  const pageCount =  Math.ceil(filter.length/pageData) 

 const category = ["Books", "Video Games", "Anime/Manga","Comics"]


return (
    <article className="landing-page">
      <p style={{fontWeight: "bold", fontSize: "30px"}}>Featured Items</p>
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
    </article>
  );
}

export default Home