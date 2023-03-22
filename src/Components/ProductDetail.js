import axios from "axios";

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FaBookmark } from "react-icons/fa"
import { FaRegBookmark } from "react-icons/fa"


import Reviews from "./Reviews/Reviews";
import ReadMore from "./ReadMore";


const API = process.env.REACT_APP_API_URL;




function ProductDetails({user}){

    const { id } = useParams();
    const [product , setProduct] = useState([])
    const [related , setRelated] = useState([])
    

    let navigate = useNavigate();
    
    
    useEffect(() => {
      axios
      .get(`${API}/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        
      })
      .catch((c) => {
        console.warn("catch", c);
      });
    }, [id]);
    
    


      useEffect(() => {
        axios
          .get(`${API}/products?category=${product.category}`)
          .then((res) => {
            setRelated(res.data);
          })
          .catch((c) => console.warn("catch, c"));
      }, [product, id]);

      
      const updateProduct = (updatedProduct, id) => {
        axios
          .put(`${API}/products/${id}`, updatedProduct)
          .then(() => navigate(`/products/${id}`))
          .catch(c => console.warn('catch', c));
    }


    const handleFavorite = () => {
      
      const copyProduct = {...product}

      copyProduct.favorites = !product.favorites

      setProduct(copyProduct)
      
      updateProduct(copyProduct, id)


    }


   



function handleCart(){

  let copyCart = {...product}

  copyCart.cart_counter = ( product.cart_counter + 1 )

  setProduct(copyCart)
  
  updateProduct(copyCart , id)

}


function handleCart2(){

  let copyCart = {...product}

  copyCart.cart_counter = ( product.cart_counter = 0 )

  setProduct(copyCart)
  
  updateProduct(copyCart , id)

}





const date = new Date(product.release_date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"2-digit"})



let number = 3

const relatedItem = related
.map(x => ({x, r: Math.random()}))
.sort((a , b) => a.r - b.r)
.map(a => a.x)
.slice(0 , number)

function handleDelete(ids){
  axios.delete(`${API}/users/${user?.id}/products/${ids}`)
  handleCart2()
 }

function addToUser(id){
  axios
  .post(`${API}/users/${user?.id}/products/${id}`)
 handleCart()
}

function addToFavorite(id){
  axios
  .post(`${API}/users/${user?.id}/products/${id}`)
 handleFavorite()
}



    return(
        <div>
          <div className="product-details">
          <div className="image-container">
       <br></br>
            <img 
                src={product.image} 
                className="image"
                alt={`${product.product_name}`} 
              />
          </div>
          <section className="info">
              <div>
                 <p style={{fontSize:"30px"}}> {product.product_name},  <span style={{fontSize: "15px" , color: "gray"}}>{date}</span></p> 
              </div>
              <div>
                <p>
                  <span style={{fontWeight: "bold"}}>Price:</span> ${product.price}
                </p>
              </div>
              <div className="product-description">
                 <ReadMore>
                 {`${product.description}`}
                </ReadMore> 

              </div>
              <div>
                <p> By: {product.manufacturer}</p>
              </div>
          </section>
          <br></br>
          </div>
    
          <div className="favorites-section">
          { 
            product.favorites ? (
              <>
              <button onClick={() => addToFavorite(product.id)} className="favorites-btn"> <FaBookmark size={25}/>  </button>
      
              </>
            ) : (
              <>
                <button onClick={ () => addToFavorite(product.id) } className="favorites-btn">  <FaRegBookmark size={25}/> </button>
 
              </>    
              )
            }
          </div>
      
          <div className="cart">
            {product.cart_counter > 0 ? (
              <button className="cart-btns" onClick={() => handleDelete(product.id)}>Delete From Cart</button>

            ) : (

          <button className="cart-btns" onClick={() => addToUser(product.id)}>Add to Cart</button>
            )}
           

          </div>
<br></br>

      <h1>Related Products</h1>
     <div className="relatedItem">
      {relatedItem.map((relate) => {
        return(
          <div key={relate.id}>
            <Link to={`/products/${relate.id}`}> 
          <img 
                src={relate.image} 
                className="related-image"
                alt={`${relate.product_name}`} 
              />
           </Link> 
           <br></br>
           
           <p style={{fontWeight:"bold"}}>{relate.product_name}</p>
          </div>
        )
      })}
     </div>
     <br></br>
        <Reviews/>
    </div>
    )
}

export default ProductDetails