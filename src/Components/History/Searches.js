import { Link } from "react-router-dom";

function Searches({product}){
    


  
  const date = new Date(product.created)?.toLocaleDateString("en-us", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
  });
  
  
  return(
    
    <section>
      <p>Search: {date}</p>
    <div>
      <Link to={`/products/${product.products_id}`}>
        <img
          src={product.image}
          alt={product.product_name}
          className="favorite-images"
          ></img>
      </Link>
      <div>
      <h5 className="product-name">
        <Link to={`/products/${product.products_id}`}>{product.product_name}</Link>
      </h5>
      <span style={{fontWeight: "bold"}}>Price:</span> ${product.price}
     
       <div>
      <input
      type="checkbox"
      onChange={(e) => {
        let value = e.target.value
        product.selected = value
        return product
     }}
      />
    </div> 
      </div>
    </div>
  
  </section>

    )
}

export default Searches