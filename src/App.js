import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home"
import Nav from "./Components/Nav"
import ProductDetails from "./Components/ProductDetail"
import ReviewNewForm from "./Components/ReviewNewForm";
import Apps from "./App.css"
import ReviewDetails from "./Components/ReviewDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <main>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails/>}/>
          <Route path="/products/:id/new" element={<ReviewNewForm/>}/>
          <Route path="/products/:id/reviews/:id" element={<ReviewDetails/>}/>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
