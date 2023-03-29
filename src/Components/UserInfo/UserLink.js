import { useNavigate, Link } from "react-router-dom";

import { useState, useEffect } from "react";


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
        <Link to={`/userDetails/${user?.id}`}>
          <p>User Info</p>
        </Link>
        <br></br>
        <Link to={`/favorites/${user?.id}`}>
          <p>Favorite Item</p>
        </Link>
        <br />
        <Link to={`/searchHistory/${user?.id}`}>
          <p>Search History</p>
        </Link>
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="vertical"></div>
      <div className="children-section">
        {children}
      </div>
    </div>
  );
}

export default UserLink
