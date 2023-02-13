import Book from "./Book"

function Books({products}){

    const books = products.filter((product) => {
        if(product.category === "Books"){
          return product
        }
      })

      console.log(books)

    return(
        <div>
            <br></br>
        <div className="product-card">
            {books.map((book) => {
                return(
                    <div key={book.id}>
                        <Book book={book}/>
                    </div>
                )
            })}
        </div>
        </div>
    )
}

export default Books