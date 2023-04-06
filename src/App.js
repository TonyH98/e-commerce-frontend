import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Components/landingpage/Home"
import Nav from "./Components/Nav"
import ProductDetails from "./Components/ProductDetail"
import ReviewNewForm from "./Components/Reviews/ReviewNewForm"
import Apps from "./App.css"
import ReviewDetails from "./Components/Reviews/ReviewDetails"
import ProductCart from "./Components/Cart/ProductCart"
import NewProducts from "./Components/NewProducts";
import ReviewChart from "./Components/Reviews/ReviewChart"

import Comics from "./Components/Comics/Comics"
import Mangas from "./Components/Manga/Mangas";
import Videogames from "./Components/VideoGames/Videogames";
import Login from "./Components/Registration/Login"
import Signup from "./Components/Registration/Signup"
import SearchHistories from "./Components/History/SearchHistories";
import UserDetails from "./Components/UserInfo/UserDetails";
import Success from "./Components/SessionPage/Success"
import Cancel from "./Components/SessionPage/Cancel";
import Favorites from "./Components/Favorite/Favorites";
import Purchases from "./Components/Purchases/Purchases";
import Footer from "./Components/Footer/Footer";

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

  
  const [isLogged, setIsLogged] = useState(false);

  const newLogin = () => {
    setIsLogged(!isLogged);
  };



  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    setUser(loggedUser);
  }, [isLogged]);
  
 


  return (
    <div className="App">
      <Router>
        <Nav productSearch={productSearch} setProductSearch={setProductSearch} isLogged={isLogged} user={user}/>
        <main>
          <Routes>
          <Route path="/" element={<Home setProducts={setProducts} products={products} user={user} />} />
          <Route path="/products/:id" element={<ProductDetails user={user}/>}/>
          <Route path="/products/:id/new" element={<ReviewNewForm user={user}/>}/>
          <Route path="/products/:id/reviews/:ids" element={<ReviewDetails/>}/>
          <Route path={`/cart/${user?.id}`} element={<ProductCart user={user}/>}/>
          <Route path="/newProduct" element={<NewProducts/>}/>
          <Route path="/products/:id/reviews/chart" element={<ReviewChart/>}/>
          <Route path="/comics" element={<Comics user={user}/>}/>
          <Route path="/mangas" element={<Mangas   user={user}/>}/>
          <Route path="/videogames" element={<Videogames user={user} />}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login newLogin={newLogin}/>}/>
          <Route path={`/favorites/${user?.id}`} element={<Favorites user={user}/>} />
          <Route path={`/purchases/${user?.id}`} element={<Purchases user={user}/>} />
          <Route path={`/userDetails/${user?.id}`} element={<UserDetails user={user}/>}/>
         <Route path={`/searchHistory/${user?.id}`} element={<SearchHistories user={user}/>}/>
         <Route path="/success" element={<Success user={user}/>}/>
         <Route path="/cancel" element={<Cancel user={user}/>}/>
          </Routes>
        </main>
        <br></br>
        <br></br>
        {/* <Footer/> */}
      </Router>

    
    </div>
  );
}

export default App;
