import Comic from "./Comic"

function Comics({products}){
    
    const comics = products.filter((product) => {
        if(product.category === "Comics"){
          return product
        }
      })

  
    return (
        <div>
        <br></br>
    <div className="product-card">
        {comics.map((comic) => {
            return(
                <div key={comic.id}>
                    <Comic comic={comic}/>
                </div>
            )
        })}
    </div>
    </div>
    )
}

export default Comics