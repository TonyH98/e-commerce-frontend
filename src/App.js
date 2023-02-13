import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Components/landingpage/Home"
import Nav from "./Components/Nav"
import ProductDetails from "./Components/ProductDetail"
import ReviewNewForm from "./Components/Reviews/ReviewNewForm"
import Apps from "./App.css"
import ReviewDetails from "./Components/Reviews/ReviewDetails"
import ProductCart from "./Components/Cart/ProductCart"
import FavoriteProduct from "./Components/Favorites/FavoriteProduct"
import NewProducts from "./Components/NewProducts";
import ReviewChart from "./Components/Reviews/ReviewChart"
import Books from "./Components/Books/Books"
import Comics from "./Components/Comics/Comics"
import Mangas from "./Components/Manga/Mangas";
import Videogames from "./Components/VideoGames/Videogames";


const API = process.env.REACT_APP_API_URL;

function App() {
  const [products , setProducts] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((c) => console.warn("catch, c"));
  }, []);

  


  return (
    <div className="App">

      <Router>
        <Nav/>
        <main>
          <Routes>
          <Route path="/" element={<Home products={products}/>} />
          <Route path="/products/:id" element={<ProductDetails/>}/>
          <Route path="/products/:id/new" element={<ReviewNewForm/>}/>
          <Route path="/products/:id/reviews/:id" element={<ReviewDetails/>}/>
          <Route path="/cart" element={<ProductCart/>}/>
          <Route path="/favorites" element={<FavoriteProduct/>}/>
          <Route path="/newProduct" element={<NewProducts/>}/>
          <Route path="/products/:id/reviews/chart" element={<ReviewChart/>}/>
          <Route path="/books" element={<Books products={products}/>}/>
          <Route path="/comics" element={<Comics products={products}/>}/>
          <Route path="/mangas" element={<Mangas products={products}/>}/>
          <Route path="/videogames" element={<Videogames products={products}/>}/>
          </Routes>
        </main>
      </Router>

    
    </div>
  );
}

export default App;
