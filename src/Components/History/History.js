import { Link } from "react-router-dom"

function History (props){

console.log(props.product.image)

    return(
        <section>
       
    <div>
      <Link to={`/products/${props.product.id}`}>
        <img
          src={props.product.image}
          alt={props.product.name}
          className="favorite-images"
        ></img>
      </Link>
      <div>
      <h5 className="product-name">
        <Link to={`/products/${props.product.id}`}>{props.product.name}</Link>
      </h5>
      <span style={{fontWeight: "bold"}}>Search:</span> {props.product.timeStamp}
     
      </div>
    </div>
  
  </section>
    )
}

export default History