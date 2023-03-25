import { Link } from "react-router-dom";

function Searches({product}){
    
console.log(product)


    return(

        <section>
       
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
     
      </div>
    </div>
  
  </section>

    )
}

export default Searches