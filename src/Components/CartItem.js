

function CartItem(props){
    return(
        <section>
        <div>
         
            <img
              src={props.product.image}
              alt={props.product.product_name}
              className="images"
            ></img>
      
          <div>
          <h5 className="product-name">
            {props.product.product_name}
          </h5>
          <span style={{fontWeight: "bold"}}>Price:</span> ${props.product.price}
          </div>
        </div>
      </section>
    )
}


export default CartItem