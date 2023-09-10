import { useNavigate, Link, useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

import "./UsersDetails.css"

function UserLink({children}) {

  const [user, setUser] = useState();

 const location = useLocation()
 
 const isActive = (path) => {
   return location.pathname === path ? 'active' : ''
 }

  

  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    setUser(loggedUser);
  }, [navigate]);




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
          <Link to={`/userDetails/${user?.id}`} className={isActive(`/userDetails/${user?.id}`)}>
            <p>User Info</p>
          </Link>
        </div>
        <div className="link-item">
          <Link to={`/searchHistory/${user?.id}`} className={isActive(`/searchHistory/${user?.id}`)}>
            <p>Search History</p>
          </Link>
        </div>
        <div className="link-item">
          <Link to={`/favorites/${user?.id}`} className={isActive(`/favorites/${user?.id}`)}>
            <p>Favorites</p>
          </Link>
        </div>
        <div className="link-item">
          <Link to={`/purchases/${user?.id}`} className={isActive(`/purchases/${user?.id}`)}>
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
