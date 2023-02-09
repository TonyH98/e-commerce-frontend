import React from "react";
import { Link } from "react-router-dom";



function Product({product}){

    

    return(
        <section>
        <div>
          <Link to={`/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.product_name}
              className="images"
            ></img>
          </Link>
          <h5 className="product-name">
            <Link to={`/products/${product.id}`}>{product.product_name}</Link>
          </h5>
        </div>
      </section>
    )
}

export default Product