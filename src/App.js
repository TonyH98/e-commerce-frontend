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
import Login from "./Components/Users/Login";
import Signup from "./Components/Users/Signup";



const API = process.env.REACT_APP_API_URL;

function App() {
  const [products , setProducts] = useState([])

  const [productSearch , setProductSearch] = useState([])

  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`${API}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((c) => console.warn("catch, c"));
  }, []);

  function categoryFilter(category){
    const filter = products.filter((product) => {
      if(product.category === category){
        return product
      }
    })
    return filter
  }


  const [isLogged, setIsLogged] = useState(false);

  const newLogin = () => {
    setIsLogged(!isLogged);
  };



  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    setUser(loggedUser);
  }, [isLogged]);


console.log(user)

  return (
    <div className="App">

      <Router>
        <Nav productSearch={productSearch} setProductSearch={setProductSearch} isLogged={isLogged}/>
        <main>
          <Routes>
          <Route path="/" element={<Home setProducts={setProducts} products={products} user={user}/>} />
          <Route path="/products/:id" element={<ProductDetails/>}/>
          <Route path="/products/:id/new" element={<ReviewNewForm/>}/>
          <Route path="/products/:id/reviews/:ids" element={<ReviewDetails/>}/>
          <Route path={`/cart/${user?.id}`} element={<ProductCart/>}/>
          <Route path={`/favorites/${user?.id}`} element={<FavoriteProduct/>}/>
          <Route path="/newProduct" element={<NewProducts/>}/>
          <Route path="/products/:id/reviews/chart" element={<ReviewChart/>}/>
          <Route path="/books" element={<Books products={products}/>}/>
          <Route path="/comics" element={<Comics products={products}/>}/>
          <Route path="/mangas" element={<Mangas products={products} categoryFilter={categoryFilter}/>}/>
          <Route path="/videogames" element={<Videogames products={products}/>}/>
          <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login newLogin={newLogin}/>}/>
          </Routes>
        </main>
      </Router>

    
    </div>
  );
}

export default App;
