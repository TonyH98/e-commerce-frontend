import axios from "axios";

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";

import Reviews from "../Reviews/Reviews";
import {AiFillHeart} from "react-icons/ai"
import {AiOutlineHeart} from "react-icons/ai"

import "./Product.css"

const API = process.env.REACT_APP_API_URL;




function ProductDetails({user}){

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [userCart , setUserCart] = useState({})

 let [mainImageIndex, setMainImageIndex] = useState(0)

  

  const [userFavorite , setUserFavorite ] = useState({})

  let [show , setShow] = useState(false)

  let [counter, setCounter] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    
    if(id){

      axios
        .get(`${API}/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);


  
  useEffect(() => {
    axios.get(`${API}/users/${user?.id}/products/${id}`)
    .then((res) => {
      setUserCart(res.data )
    })
    .catch((err) => console.log(err))
  }, [user?.id])

  useEffect(() => {
    axios.get(`${API}/users/${user?.id}/favorites/${id}`)
    .then((res) => {
      setUserFavorite(res.data)
    })
    .catch((err) => console.log(err))
  }, [user?.id])
  
  
  function addToFav() {
    if(user){
      axios
        .post(`${API}/users/${user?.id}/favorites/${product.id}`, product)
        .then((res) => {
          axios
            .get(`${API}/users/${user?.id}/favorites/${id}`)
            .then((res) => {
              setUserFavorite(res.data);
            })
            .catch((err) =>
              console.error('Failed to fetch cart information:', err)
            );
        })
        .catch((err) => console.error('Failed to add product to user:', err));

    }
    else{
      navigate("/login")
    }

  }
  
  function removeFav() {
    if (userFavorite.favorites) {
      axios
        .delete(`${API}/users/${user?.id}/favorites/${id}`)
        .then(() => {
          axios
            .get(`${API}/users/${user?.id}/favorites`)
            .then((res) => {
              setUserFavorite(res.data);
              console.log(userFavorite);
            })
            .catch((err) => console.error('Failed to fetch user favorites:', err));
        })
        .catch((err) => console.error('Failed to delete product from user:', err));
    } else {
      console.warn('User favorites not found.');
    }
  }
  



  function addToUser(quantity) {
    if (user) {
      axios
        .post(`${API}/users/${user?.id}/products/${product.id}`, { quantity })
        .then((res) => {
          axios
            .get(`${API}/users/${user?.id}/products/${id}`)
            .then((res) => {
              setUserCart(res.data);
            })
            .catch((err) => console.error('Failed to fetch cart information:', err));
        })
        .catch((err) => console.error('Failed to add product to user:', err));
    } else {
      navigate("/login");
    }
  }
  
  
  



 
function counterInput(event){
  const inputValue = parseInt(event.target.value);

    setCounter(inputValue);

}

const buyNow = async () => {
  
  if(user){
    const lineItems = [{
    product_name: product.product_name,
    image: product.image,
     price: product.price,
     quantity: 1
    }]
    
      const response = await fetch(`${API}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: lineItems,
        }),
      });
    
      const data = await response.json();
    
      if (data.url) {
        window.location.assign(data.url);
      }


      if (response.ok) {
            await axios.post(`${API}/users/${user?.id}/purchases/${product.id}`, product);
    
      }

  }
else{
  navigate("/login")
}


}


function handleShow(){

  setShow(!show)

}


const handleImageIndex = (index) => {

  setMainImageIndex(index)
}


console.log(userFavorite.favorites)


    return(
        <div>
          
          <div className="product-details">

          { product.images?.length > 0 ? (
          <div className="image-container">
      <div className="main-image">
        <img
          src={product.images[mainImageIndex].image}
          className="image"
          alt={product.product_name}
        />
      </div>

      <div className="image-option">
        {product.images.map((pic, index) => (
          <img
            key={index}
            src={pic.image}
            className={index === mainImageIndex ? "active selected-image" : "notActive selected-image"}
            alt={product.product_name}
            onClick={() => handleImageIndex(index)}
          />
        ))}
      </div>
    </div>


          ): null}
       

          <section className="info">

              <div className="details-name">
                 <p style={{fontSize:"30px"}}> {product.product_name}</p> 

                <p className="manu-details"> By: {product.manufacturer}</p>

                <p className="price-detail">
            Price: ${product.price}

                </p>

              </div>

              <hr className="hr-product"></hr>
              
              <div className="input-container">

              <div className="cart-counter-input">
             
                <label htmlFor="cart-input" className="input-label">
                  Quantity:
                <input
                className="cart-input"
                type="number"
                min="1"
                value={counter}
                onChange={counterInput}
                />
                </label>
      
              </div>
             
    
              <div className="cart">
                {userCart?.quantity > 0 ? (
                   <Link to={`/cart/${user?.id}`}>
                   <button className="add-delete">View Cart</button> 
                   
                               </Link>
                ) : (
              <button className="add-delete" onClick={() => addToUser(counter)}>Add to Cart</button>
                )}
              <button className="add-delete" onClick={buyNow}>Buy it Now</button>
              {userFavorite.favorites ? (
                <button className="fav-btns"onClick={removeFav} ><AiFillHeart size={40} color="red"/></button>
              ): 
                <button  className="fav-btns" onClick={addToFav}><AiOutlineHeart size={40} color="red"/></button>
              }

    
         </div>
           

              </div>

              <hr className="hr-product"></hr>


              <div className="description-container">

              <button className="des-btns" onClick={handleShow}>{show ? "Show Less" : "Show More"}</button>

              {show ? (
              <p className="product-description">
                 {product.description}
              </p>


              ) : null}

              </div>

              <hr className="hr-product"></hr>

          </section>

          </div>



     <br></br>
        <Reviews user={user}/>
    </div>
    )
}

export default ProductDetails