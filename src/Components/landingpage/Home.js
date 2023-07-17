import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "./home.css"

const API = process.env.REACT_APP_API_URL;

function Home({products, user}){
  

const copy = [...products]

const selectedProducts = copy.filter((ele) => {
  if(ele.product_name === "Metroid Prime" ||
   ele.product_name === "One Piece Vol 1" || ele.product_name === "Invincible Compendium Volume 1"){
     return ele
   }
})


const copy2 = [...products]

const featured = copy2.filter((ele) => {
  if(ele.product_name === "Super Mario Galaxy" 
  || ele.product_name === "Chainsaw Man, Vol. 1" || ele.product_name === "Deadly Class Vol. 1: Reagan Youth"){
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


return (
  <div>

    <div className="landing-page">

      <div className="landing-column">
        <h1 className="landing-header">Explore our collection</h1>
        <p className="category-description">
        Experience premium entertainment with our collection of Mangas, Comic Books, 
        and Video Games.
         <br/>
        Choose from both physical and digital formats 
        <br></br>
        for a 
        superior entertainment experience.
        </p>
        <div className="button-container">


        </div>
      </div>

      <div className="border-products">
       {selectedProducts.map((product) => {
         return(
          <Link to={`/products/${product.id}`} onClick={() => addToSearchHistory(user?.id, product.id)}>
          <img
          src={product.image}
          alt={product.product_name}
          className="selected-image"
          />
          </Link>
         )
       })}
      </div>

    </div>
       <br></br>
       <div className="featured-section">
        <h2 className="featured-header">Featured Items:</h2>

        <div className="featured-items">
          
        {featured.map((product) => {
          return(
            <div className="featured-border">
              
              <Link to={`/products/${product.id}`} onClick={() => addToSearchHistory(user?.id, product.id)}>
              <img
             src={product.image}
             alt={product.product_name}
             className="featured-image"
             />
              </Link>

            <div className="featured-name">
             <h4>{product.product_name}</h4>

            </div>

            </div>
          )
        })}

        </div>        

       </div>
       <br></br>


       <div className="featured-section">
        <h2 className="featured-header">Recommend Items:</h2>

        <div className="featured-items">
          
        {recommended.map((product) => {
          return(
            <div className="featured-border">

                <Link to={`/products/${product.id}`} onClick={() => addToSearchHistory(user?.id, product.id)}>
              <img
             src={product.image}
             alt={product.product_name}
             className="featured-image"
             />
                </Link>

            <div className="featured-name">
             <h4>{product.product_name}</h4>

            </div>

            </div>
          )
        })}

        </div>        

       </div>



  </div>
  );
}

export default Home
