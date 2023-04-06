import React from "react";
import { Link } from "react-router-dom";



function Home({products }){
  

const copy = [...products]

const selectedProducts = copy.filter((ele) => {
  if(ele.product_name === "Metroid Dread" ||
   ele.product_name === "One Piece Vol 1" || ele.product_name === "Invincible Compendium Volume 1"){
     return ele
   }
})


console.log(selectedProducts)


const copy2 = [...products]

const featured = copy2.filter((ele) => {
  if(ele.product_name === "Smash Ultimate" 
  || ele.product_name === "Chainsaw Man, Vol. 1" || ele.product_name === "Deadly Class Vol. 1: Reagan Youth"){
    return ele
  }
})

const copy3 = [...products]

const recommended = copy3.filter((ele) => {
  if(ele.product_name === "Neo: The World Ends with You" || ele.product_name === "Berserk Vol 1" || ele.product_name === "Bone: The Complete Cartoon Epic in One Volume"){
    return ele
  }
})


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
       <br></br>
       <div className="featured-section">
        <h1 className="featured-header">Featured Items:</h1>

        <div className="featured-items">
          
        {featured.map((product) => {
          return(
            <div className="featured-border">
              
              <Link to={`/products/${product.id}`}>
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
        <h1 className="featured-header">Recommend Items:</h1>

        <div className="featured-items">
          
        {recommended.map((product) => {
          return(
            <div className="featured-border">

                <Link to={`/products/${product.id}`}>
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
