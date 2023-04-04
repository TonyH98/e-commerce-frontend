import axios from "axios";

import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";

import Reviews from "./Reviews/Reviews";
import ReadMore from "./ReadMore";
import {AiFillHeart} from "react-icons/ai"
import {AiOutlineHeart} from "react-icons/ai"

const API = process.env.REACT_APP_API_URL;




function ProductDetails({user}){

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [userCart , setUserCart] = useState({})

  const [userFavorite , setUserFavorite ] = useState({})

  let [counter, setCounter] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${API}/products?category=${product.category}`)
      .then((res) => setRelated(res.data))
      .catch((err) => console.error(err));
  }, [product.category]);




  
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
    if(user){
      axios
        .post(`${API}/users/${user?.id}/products/${product.id}`, { quantity })
        .then((res) => {
   
          axios
            .get(`${API}/users/${user?.id}/products/${id}`)
            .then((res) => {
              setUserCart(res.data);
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
  
  
  function deleteCart() {
    if (userCart?.quantity > 0) {
      axios.delete(`${API}/users/${user?.id}/products/${id}`)
        .then(() => {
          // fetch the updated cart information
          axios.get(`${API}/users/${user?.id}/products`)
            .then((res) => {
              setUserCart(res.data);
            })
            .catch((err) => console.error('Failed to fetch cart information:', err));
        })
        .catch((err) => console.error('Failed to delete product from user:', err));
    }
  }







  const date = new Date(product.release_date)?.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const relatedItems = related
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);


function counterIncrease(){
  setCounter(counter += 1)
}

function counterDecrease(){
  setCounter(counter -= 1)
  if(counter <0 ){
    setCounter(0)
  }
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

              <div className="details-name">
                 <p style={{fontSize:"30px"}}> {product.product_name},  <span style={{fontSize: "15px" , color: "gray"}}>{date}</span></p> 
              </div>
              <div>
                <p className="price-detail">
                  <span   style={{fontWeight: "bold"}}>Price:</span> ${product.price}
                </p>
              </div>
              <p className="product-description">
                 <ReadMore>
                 {`${product.description}`}
                </ReadMore> 

              </p>
              <div>
                <p className="manu-details"> By: {product.manufacturer}</p>
              </div>
          </section>
          <br></br>
          </div>

          <div className="cart-counter-input">
            <button className="decrease-increase" onClick={counterDecrease}>-</button>
            <input
            className="cart-input"
            value={counter}
            />
            <button className="decrease-increase"  onClick={counterIncrease}>+</button>
          </div>
         
      <br></br>
          <div className="cart">
            {userCart?.quantity > 0 ? (
              <button className="add-delete" onClick={deleteCart} >Delete From Cart</button>
            ) : (
          <button className="add-delete" onClick={() => addToUser(counter)}>Add to Cart</button>
            )}
           
              <br></br>
              <br></br>
          <button className="add-delete" onClick={buyNow}>Buy it Now</button>
              <br></br>
          {userFavorite.favorites ? (
            <button className="fav-btns"onClick={removeFav} ><AiFillHeart size={30}/></button>
          ): 
            <button  className="fav-btns" onClick={addToFav}><AiOutlineHeart size={30}/></button>
          }

<br></br>

         

     </div>
     <br></br>
        <Reviews user={user}/>
    </div>
    )
}

export default ProductDetails