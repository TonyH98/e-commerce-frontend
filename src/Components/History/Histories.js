import History from "./History"

function Histories ({history}){

    return(
        <div>
        <div>
        <h1>Search History</h1>
        </div>
            <div className="product-card favorite-card">
              {history.map((product) => {
                    return(
                      <div key={product.id} className="product-card">
                        <History product={product}/>
                  </div>
                    )
              })}
            </div>
        
    </div>
    )
}

export default Histories