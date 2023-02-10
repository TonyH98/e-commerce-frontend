import { useState  } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";



const API = process.env.REACT_APP_API_URL;

function NewProducts(){
    const [product , setProduct] = useState({
        product_name: "",
        release_date: "",
        image: "",
        description: "",
        price: "",
        category: "",
        favorites: false,
        manufacturer: ""
    })


    let navigate = useNavigate();


    const addProduct = (newProduct) => {
        axios
          .post(`${API}/products`, newProduct)
          .then(
            () => {
              navigate(`/`);
            },
            (error) => console.error(error)
          )
          .catch((c) => console.warn("catch", c));
      };


      const handleTextChange = (event) => {
        setProduct({ ...product, [event.target.id]: event.target.value });
      };


      const handleSelect = (event) => {
        setProduct({...product, category: event.target.value })
      }

      const handleSubmit = (event) => {
        event.preventDefault();
          addProduct(product);
      };


    const category = ["Sports", "Books", "Video Games", "Anime/Manga", "Cloths", "Technology", "Toys", "Furniture", "Comics"]

    console.log(product)

    // <label htmlFor="category">Category:</label>
    // <select onChange={handleSelect}>
    //   <option value=""></option>
    //   {category.map((c) => {
    //     return(
    //       <option value={c}>{c}</option>
    //     )
    //   })} 
    // </select>

console.log(product)


    return (
       <div className="new-form">
        <h1>Create New Product</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="product_name">Product Name:</label>
        <input
        id="product_name"
        value={product.product_name}
        type="text"
        onChange={handleTextChange}
        placeholder="Product Name"
        required
        />
        <br></br>
        <label htmlFor="release_date">Release Date:</label>
        <input
        id="release_date"
        value={product.release_date}
        type="date"
        onChange={handleTextChange}
        required
        />
        <br></br>
        <label htmlFor="image">Image:</label>
        <input
        id="image"
        value={product.image}
        type="text"
        onChange={handleTextChange}
        required
        />
        <br></br>
         <label htmlFor="price">Price:</label>
        <input
        id="price"
        value={product.price}
        type="number"
        onChange={handleTextChange}
        required
        />
        <br></br>
        <label htmlFor="category">Category:</label>
    <select onChange={handleSelect}>
      <option value=""></option>
      {category.map((c) => {
        return(
          <option value={c}>{c}</option>
        )
      })} 
    </select>
       
        <br></br>
        <label htmlFor="manufacturer">Manufacturer:</label>
        <input
        id="manufacturer"
        value={product.manufacturer}
        type="text"
        onChange={handleTextChange}
        required
        />
        <br></br>
        <label htmlFor="description">Description:</label>
        <textarea
        id="description"
        value={product.description}
        type="text"
        onChange={handleTextChange}
        required
        />
        <br></br>
        <input type="submit" />
        </form>
        <Link to={`/`}>
        Back
      </Link>
       </div>
    )
}

export default NewProducts