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
import FavoriteProduct from "./Components/Favorites/FavoriteProduct"
import NewProducts from "./Components/NewProducts";
import ReviewChart from "./Components/Reviews/ReviewChart"
import Books from "./Components/Books/Books"
import Comics from "./Components/Comics/Comics"
import Mangas from "./Components/Manga/Mangas";
import Videogames from "./Components/VideoGames/Videogames";
import Login from "./Components/Registration/Login"
import Signup from "./Components/Registration/Signup"
import SearchHistories from "./Components/History/SearchHistories";
import PurchaseHistory from "./Components/History/PurchaseHistory";
import UserDetails from "./Components/UserInfo/UserDetails";
import Success from "./Components/CheckoutURL/Success"
import Cancel from "./Components/CheckoutURL/Cancel"


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
  
  const date = new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"2-digit"})


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
          <Route path={`/favorites/${user?.id}`} element={<FavoriteProduct  user={user}/>}/>
          <Route path="/newProduct" element={<NewProducts/>}/>
          <Route path="/products/:id/reviews/chart" element={<ReviewChart/>}/>
          <Route path="/books" element={<Books/>}/>
          <Route path="/comics" element={<Comics/>}/>
          <Route path="/mangas" element={<Mangas   user={user}/>}/>
          <Route path="/videogames" element={<Videogames user={user} />}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login newLogin={newLogin}/>}/>
          <Route path={`/userDetails/${user?.id}`} element={<UserDetails user={user}/>}/>
         <Route path={`/searchHistory/${user?.id}`} element={<SearchHistories user={user}/>}/>
         <Route path={`/purchaseHistory/${user?.id}`} element={<PurchaseHistory/>}/>
         <Route path="/success" element={<Success/>}/>
         <Route path="/cancel" element={<Cancel/>}/>
          </Routes>
        </main>
      </Router>

    
    </div>
  );
}

export default App;


// const handleEdit = (updatedCart) => {
//   axios
//     .put(`${API}/users/${user?.id}/products/${updatedCart.id}`, updatedCart)
//     .then((response) => {
//       const copyCartArray = [...products];
//       const indexUpdatedCart = copyCartArray.findIndex((cart) => {
//         return cart.id === updatedCart.id;
//       });
//       copyCartArray[indexUpdatedCart] = response.data;
//       setProducts(copyCartArray);
//     })
//     .then(() => {
//       navigate(`/cart/${user?.id}`);
//     })
//     .catch((c) => console.warn("catch", c));
// };

// const cartCounter = products.map((product) =>
//   Number(product.cart_counter * product.price)
// );

// const every = cartCounter.every((x) => {
//   return x === 0;
// });

// const clearCart = () => {
//   const clear = products.filter((x) => x.cart_counter !== 0);
//   clear.forEach((product) => {
//     handleEdit({ ...product, cart_counter: 0 });
//   });
// };