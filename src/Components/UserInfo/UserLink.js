import { useNavigate, Link } from "react-router-dom";

import { useState, useEffect } from "react";

import "./UserLink.css"

function UserLink({children}) {

  const [user, setUser] = useState();

 

  


  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    setUser(loggedUser);
  }, []);



  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    fetch("/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  

  
  return (
    <div className="userDetails">
     <div className="userLink">
  <div className="link-item">
    <Link to={`/userDetails/${user?.id}`}>
      <p>User Info</p>
    </Link>
  </div>
  <div className="link-item">
    <Link to={`/searchHistory/${user?.id}`}>
      <p>Search History</p>
    </Link>
  </div>
  <div className="link-item">
    <Link to={`/favorites/${user?.id}`}>
      <p>Favorites</p>
    </Link>
  </div>
  <div className="link-item">
    <Link to={`/purchases/${user?.id}`}>
      <p>Purchase History</p>
    </Link>
  </div>
  <div className="link-item">


  <button onClick={handleLogout} className="logout">Logout</button>
  </div>
</div>
      <div className="vertical"></div>
      <div className="children-section">
        {children}
      </div>
    </div>
  );
}

export default UserLink
