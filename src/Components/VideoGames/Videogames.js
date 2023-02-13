import Videogame from "./Videogame"

function Videogames({products}){

    const games = products.filter((product) => {
        if(product.category === "Video Games"){
          return product
        }
      })

      console.log(games)



    return(
        <div>
        <br></br>
    <div className="product-card">
        {games.map((game) => {
            return(
                <div key={game.id}>
                    <Videogame game={game}/>
                </div>
            )
        })}
    </div>
    </div>
    )
}

export default Videogames