import Manga from "./Manga"

function Mangas({products}){

    const manga = products.filter((product) => {
        if(product.category === "Anime/Manga"){
          return product
        }
      })

      console.log(manga)

    return(
        <div>
        <br></br>
    <div className="product-card">
        {manga.map((manga) => {
            return(
                <div key={manga.id}>
                    <Manga manga={manga}/>
                </div>
            )
        })}
    </div>
    </div>
    )
}

export default Mangas