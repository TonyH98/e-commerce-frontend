import Videogame from "./Videogame"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const API = process.env.REACT_APP_API_URL;


function Videogames({user}){

  const [products, setProducts] = useState([]);

  const [filterProducts , setFilterProducts] = useState([])

  const [brandList , setBrandList] = useState([])

  const [show , setShow] = useState(false)

  useEffect(() => {

   
      axios
        .get(`${API}/products?category=video+games`)
        .then((res) => {
          setProducts(res.data);
          setFilterProducts(res.data)
        })
        .catch((error) => {
          console.warn("Error fetching products", error);
        });
  }, []);


  const filterByBrand = () => {

    if(brandList.length === 0){
      return filterProducts
    }
    
    else{
    return filterProducts.filter((product) =>  brandList.includes(product.manufacturer))
    
    }
    
    }
    
    
   
    const handlePrice = (price) => {
      if (price === "") {
        axios
          .get(`${API}/products?category=video+games`)
          .then((res) => {
            setProducts(res.data);
          })
          .catch((c) => console.warn("catch", c));
      } else if (price === "High to Low") {
        const sortedProducts = [...filterProducts].sort((a, b) =>
          parseFloat(b.price) - parseFloat(a.price)
        );
        setFilterProducts(sortedProducts);
      } else if (price === "Low to High") {
        const sortedProducts = [...filterProducts].sort((a, b) =>
          parseFloat(a.price) - parseFloat(b.price)
        );
        setFilterProducts(sortedProducts);
      }
    };
    

    const sortAlphabetically = (alpha) => {
      if (alpha === "") {
        axios
          .get(`${API}/products?category=video+games`)
          .then((res) => {
            setProducts(res.data);
          })
          .catch((c) => console.warn("catch", c));
      } 
      else if (alpha === "A-Z"){
        const sort = [...filterProducts].sort((a , b) => {
          return a.product_name.localeCompare(b.product_name)
        })
        setFilterProducts(sort)
      }
      else if (alpha === "Z-A"){
        const sort = [...filterProducts].sort((a , b) => {
          return b.product_name.localeCompare(a.product_name)
        })
      setFilterProducts(sort)
      }
      
    }


    let brands = ["Nintendo", 'Square Enix', 'Capcom', 'Konami', 'Sega', 'Sony', 'Microsoft', 'Devolver', 'Nihon Falcom', 'Bandai Namco']

    function addBrand(e) {
      const brandName = e.target.value;
      if (e.target.checked) {
        // If the checkbox is checked, add the brand to the brandList
        setBrandList(prevBrandList => [...prevBrandList, brandName]);
      } else {
        // If the checkbox is unchecked, remove the brand from the brandList
        setBrandList(prevBrandList => prevBrandList.filter(brand => brand !== brandName));
      }
    }



  
    return(
        <div>
         
            <h1>Video Games Section</h1>
    
         

       <div className="product-page-container">

     
          <div className="filter-products">
        
       <div className="select-container">

          <div>
            <label>Sort by Price:</label>
            
            <select onChange={(e) => handlePrice(e.target.value)}>
            <option value="">Select</option>
            <option value="High to Low">High to Low</option>
            <option value="Low to High">Low to High</option>
            </select>
          </div>
          <div>
            <label>Sort Alphabetically:</label>
            
            <select onChange={(e) => sortAlphabetically(e.target.value)}>
            <option value="">Select</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            </select>
          </div>

       </div>
  
          <div className="filter-toggle">
       

            {brands.map((brand) => {
              return (
                <div>
                  <input
                  type="checkbox"
                  value={brand}
                  className="check-filter"
                  onChange={addBrand}
                  checked = {brandList.includes(brand)}
                  /> <span className="brand-name">{brand}</span>

                </div>

            )

            })}


            </div>
    
        </div>

    <div className="product-card">
        {filterByBrand().map((game) => {
            return(
                <div key={game.id} className="product">
                    <Videogame game={game} user={user}/>
                </div>
            )
        })}
    </div>
    </div>

       </div>
    )
}

export default Videogames