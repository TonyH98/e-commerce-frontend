

function Search({productSearch}){

console.log(productSearch)

    return(
        <div>
            {productSearch.map((x) => {
                return(
                    <div>
                        {x.product_name}
                    </div>
                )
            })}
        </div>
    )
}

export default Search