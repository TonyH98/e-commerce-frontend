
import { Link } from "react-router-dom";
import { ShoppingCart} from "phosphor-react";

function Nav(){



    return(
        <nav className="Navigation">
         

        <h1 className="home-page-link">
          <Link to="/">
          <img src="/logo192.png" width="40"/> React Commerce
          </Link>
        </h1>
  

      <div className="Nav-Category">

        <Link to="/books">
        <div className="product-category">Books</div>
        </Link>

        <Link to="/videogames">
        <div className="product-category">Video Games</div>
        </Link>

        <Link to="/mangas">
        <div className="product-category">Anime/Manga</div>
        </Link>

        <Link to="comics">
        <div className="product-category">Comics</div>
        </Link>

      </div>


      <div className="dropdown">
        <button className="dropbtn"> User </button>
        <div className="items">

          <div>
        <Link to="/cart">
        <ShoppingCart color="black" size={30}/>
        </Link>
          </div>

        <h3>
          <Link to="/favorites">Favorite Items</Link>
        </h3>

      <div className="link-new">
      <Link to="/newProduct">
        <h3> Create New Product </h3>
      </Link>
      </div>

        </div>
      </div>

      </nav>
    )
}

export default Nav