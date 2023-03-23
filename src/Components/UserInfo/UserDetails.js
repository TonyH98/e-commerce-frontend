import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UserEdit from "./UserEdit";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function UserDetails({ user }) {
  const [hidden, setHidden] = useState(false);
  const [detail, setDetail] = useState({});

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

  useEffect(() => {
    axios
      .get(`${API}/users/${user?.id}`)
      .then((res) => {
        setDetail(res.data);
      })
      .then(() => {
        navigate(`/userInfo/${user?.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const toggleView = () => {
    setHidden(!hidden);
  };

  const handleUserUpdate = (updatedUser) => {
    setDetail(updatedUser);
  };

  return (
    <div className="userDetails">
      <div className="userLink">
        <Link to={`/favorites/${user?.id}`}>
          <p>Favorite Item</p>
        </Link>
        <br />
        <Link to={`/searchHistory/${user?.id}`}>
          <p>Search History</p>
        </Link>
        <br />
        <Link to={`/purchaseHistory/${user?.id}`}>
          <p>Purchase History</p>
        </Link>
        <br />
        <div className="darkmode">
          <input className="toggle" type="checkbox" />
        </div>
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="vertical"></div>
      <div className="userInfo">
        <h1>{`${detail.firstname} ${detail.lastname} Information`}</h1>
        <br />
        {hidden ? (
          <UserEdit
            toggleView={toggleView}
            detail={detail}
            onUserUpdate={handleUserUpdate}
          />
        ) : (
          <>
            <p>
              <span style={{ fontWeight: "bold" }}>User Name:</span>
              {detail.username}
            </p>
            <br />
            <p>
              <span style={{ fontWeight: "bold" }}>First Name:</span>
              {detail.firstname}
            </p>
            <br />
            <p>
              <span style={{ fontWeight: "bold" }}>Last Name:</span>
              {detail.lastname}
            </p>
            <br />
            <p>
              <span style={{ fontWeight: "bold" }}>Email:</span>
              {detail.email}
            </p>
            <br />
            <p>
              <span style={{ fontWeight: "bold" }}>Phone Number:</span>
              {detail.phonenumber}
            </p>
          </>
        )}
        <button className="edit" onClick={toggleView}>
          Edit User
        </button>
      </div>
    </div>
  );
}

export default UserDetails;
