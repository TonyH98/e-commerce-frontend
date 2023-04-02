import Comic from "./Comic"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryHeading from "../CategoryHeading";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function Comics({user}){
    
    const [products , setProducts] = useState([])


    let navigate = useNavigate()


    useEffect(() => {
      axios
        .get(`${API}/products?category=Comics`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((c) => console.warn("catch, c"));
    }, []);


    const handleEdit = (updatedCart) => {
        axios
        .put(`${API}/products/${updatedCart.id}`, updatedCart)
        .then((response) => {
          const copyCartArray = [...products];
          const indexUpdatedCart = copyCartArray.findIndex((cart) => {
            return cart.id === updatedCart.id;
          });
          copyCartArray[indexUpdatedCart] = response.data;
          setProducts(copyCartArray);
        })
        .then(() => {
          navigate(`/comics`)
        })
        .catch((c) => console.warn("catch", c));
      };


      const handlePrice = (price) => {
        if (price === "") {
          axios
            .get(`${API}/products?category=Comics`)
            .then((res) => {
              setProducts(res.data);
            })
            .catch((c) => console.warn("catch", c));
        } else if (price === "High to Low") {
          const sortedProducts = [...products].sort((a, b) =>
            parseFloat(b.price) - parseFloat(a.price)
          );
          setProducts(sortedProducts);
        } else if (price === "Low to High") {
          const sortedProducts = [...products].sort((a, b) =>
            parseFloat(a.price) - parseFloat(b.price)
          );
          setProducts(sortedProducts);
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
          const sort = [...products].sort((a , b) => {
            return a.product_name.localeCompare(b.product_name)
          })
          setProducts(sort)
        }
        else if (alpha === "Z-A"){
          const sort = [...products].sort((a , b) => {
            return b.product_name.localeCompare(a.product_name)
          })
          setProducts(sort)
        }
        
      }
  
  




    
    return (
      <div>
      <CategoryHeading>
        Anime/Manga Section
      </CategoryHeading>

    <div className="filter-products">
      
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
    
    <br></br>
<div className="product-card">
    {products.map((comic) => {
        return(
          <div key={comic.id} className="product">
                <Comic comic={comic} handleEdit={handleEdit} user={user}/>
            </div>
        )
    })}
</div>
</div>
    )
}

export default Comics