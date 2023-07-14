import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Purchase({product, user}){


  const API = process.env.REACT_APP_API_URL;

const navigate = useNavigate()

    const date = new Date(product.created)?.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });

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
      
        }
      else{
        navigate("/login")
      }
      
      
      }


    return(

        <section className="history-box">

      <div className="search-image">
      <Link to={`/products/${product.products_id}`}>
        <img
          src={product.image}
          alt={product.product_name}
          className="search-images"
          ></img>
      </Link>
          <p className="date-section purchase-date"> <span style={{fontWeight:"bold"}}>Purchased:</span> {date}</p>
          <button className="buy-again" onClick={buyNow}>Buy Again</button>
      </div>
      


    <div className="info-section">
      <h4 className="product-name">
        <Link to={`/products/${product.products_id}`}>{product.product_name}</Link>
      </h4>
      <span style={{fontWeight: "bold"}}>Price:</span> ${product.price}
     
      <br></br>
      
      <br></br>
      <input
      type="checkbox"
      onChange={(e) => {
        let value = e.target.value
        product.selected = value
        return product
     }}
      />

    </div>

    

  </section>


    )
}

export default Purchase