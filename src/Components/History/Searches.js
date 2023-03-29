import { Link } from "react-router-dom";

function Searches({product}){
    


  
  const date = new Date(product.created)?.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  
  
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
          <p> <span style={{fontWeight:"bold"}}>Search:</span> {date}</p>
      </div>
      


    <div>
      <h3 className="product-name">
        <Link to={`/products/${product.products_id}`}>{product.product_name}</Link>
      </h3>
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

export default Searches