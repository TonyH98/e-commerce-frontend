import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import "./home.css"

const API = process.env.REACT_APP_API_URL;


const pageData = 1

function Home({products, user}){

  const [currentPage, setCurrentPage] = useState(0)

const copy = [...products]

const selectedProducts = copy.filter((ele) => {
  if(ele.product_name === "Metroid Prime" ||
   ele.product_name === "Chainsaw Man, Vol. 1" || ele.product_name === "Invincible Compendium Volume 1"){
     return ele
   }
})


const copy2 = [...products]

const featured = copy2.filter((ele) => {
  if(ele.product_name === "Super Mario Galaxy" 
  || ele.product_name === "One Piece Vol 1" || ele.product_name === "Deadly Class Vol. 1: Reagan Youth"){
    return ele
  }
})

const copy3 = [...products]

const recommended = copy3.filter((ele) => {
  if(ele.product_name === "The Legend of Zelda: Twilight Princess" || ele.product_name === "Berserk Vol 1" || ele.product_name === "Bone: The Complete Volume"){
    return ele
  }
})


function addToSearchHistory(id, productId){
  if(!id){
    return
  }
  axios.post(`${API}/users/${id}/search/${productId}`)
}


function handlePageChange ({selected: selectedPage}){
  setCurrentPage(selectedPage);
}


const offSet = currentPage * pageData;
  
 
  
  const pageCount = Math.ceil(selectedProducts.length / pageData);



return (
  <div className="Home">
    
    <div className="landing-page">

     <h3 className="feature-header">Featured Products</h3> 


    <div className="border-product-container">
    {selectedProducts.slice(offSet, offSet + pageData).map((product) => {

      return(
        <div className="border-product">

        <div className="border_images_container">
          <img src={product.image[0]?.image} className="border_images"/>
        </div>

        <div className="border_product_description">
        
          <h1 className="border_product_name">{product.product_name}</h1>

          <p className="border_product_desc">{product.description}</p>

          <div className="border_button_container">
          <Link to={`/products/${product.id}`} onClick={() => addToSearchHistory(user?.id, product.id)}>
          <button className="border_button">Product Page</button>
          </Link>

          </div>
        </div>


        </div>
      )
    })}

    </div>
    
    <div className="page-count">
  <ReactPaginate
    previousLabel={"<"}
    nextLabel={">"}
    pageCount={pageCount}
    onPageChange={handlePageChange}
    containerClassName={"home-pagination"}
    previousLinkClassName={"pagination-link"}
    nextLinkClassName={"pagination-link"}
    pageClassName={"page-item"}
    pageLinkClassName={"page-link"}
    activeClassName={"active"}
  />
</div>


    </div>


    
  <div className="popular_products_section">

      <h3 className="feature-header">Popular Products</h3>

      <div className="popular_products_container">

      {featured.map((product) => {
        return(
          <Link to={`/products/${product.id}`} onClick={() => addToSearchHistory(user?.id, product.id)}>
          <div className="popular_products_border">

          <div className="popular_product_image_container">
            <img
            src={product.image[product.image.length - 1]?.image}
            className="popular_product_image"
            />
          </div>

          <div className="popular_product_price_button_container">

<div className="popular_product_price_container">

  <h4 style={{color: "white"}}>
  {product.product_name}
  </h4>
  <div style={{color: "white"}}>${product.price}</div>
          
</div>



</div>


          </div>

          </Link>
        )


      })}
      </div>

  </div>
       

  <div className="popular_products_section">

      <h3 className="feature-header">Recommend Products</h3>

      <div className="popular_products_container">

      {recommended.map((product) => {
        return(
          <Link to={`/products/${product.id}`} onClick={() => addToSearchHistory(user?.id, product.id)}>

          <div className="popular_products_border">

          <div className="popular_product_image_container">
            <img
            src={product.image[product.image.length - 1]?.image}
            className="popular_product_image"
            />
          </div>

          <div className="popular_product_price_button_container">

          <div className="popular_product_price_container">

<h4 style={{color: "white"}}>
{product.product_name}
</h4>
<div style={{color: "white"}}>${product.price}</div>
        
</div>

</div>


          </div>
          </Link>
        )


      })}
      </div>

  </div>
       


  </div>
  );
}

export default Home
