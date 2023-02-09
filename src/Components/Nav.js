import { Link } from "react-router-dom";

function Nav(){
    return(
        <nav className="Navigation">
        <h1 className="home-page-link">
          <Link to="/">E-Commerce App</Link>
        </h1>
      </nav>
    )
}

export default Nav