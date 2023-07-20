import Comic from "./Comic"
import { useState, useEffect } from "react";

import axios from "axios";
import "./Comic.css"

const API = process.env.REACT_APP_API_URL;
function Comics({user}){
    
  const [products , setProducts] = useState([])

  const [filterProducts , setFilterProducts] = useState([])

  const [brandList , setBrandList] = useState([])

    useEffect(() => {
        axios
          .get(`${API}/products?category=Comics`)
          .then((res) => {
            setProducts(res.data);
            setFilterProducts(res.data)
          })
          .catch((c) => console.warn("catch, c"));

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
            .get(`${API}/products?category=Comics`)
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
          .get(`${API}/products?category=Comics`)
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
  
      const brands = ['Image Comics', 'Cartoon Books', 'DC', 'Vertigo', 'Marvel', 'Wildstorm', 'Dark Horse Comic']


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
         
            <h1>Comics Section</h1>
    
         

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
        {filterByBrand().map((comic) => {
            return(
              <div key={comic.id} className="product">
                       <Comic comic={comic}  user={user}/>
                  </div>
            )
        })}
    </div>
    </div>

       </div>
    )
}

export default Comics


