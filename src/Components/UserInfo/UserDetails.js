import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserEdit from "./UserEdit";
import axios from "axios";
import UserLink from "./UserLink";
import "./UsersDetails.css"

const API = process.env.REACT_APP_API_URL;

function UserDetails({user}){

    const [hidden, setHidden] = useState(false);
    const [detail, setDetail] = useState({});
  
    const navigate = useNavigate();
  
   
  
    useEffect(() => {
      axios
        .get(`${API}/users/${user?.id}`)
        .then((res) => {
          setDetail(res.data);
        })
        .then(() => {
          navigate(`/userDetails/${user?.id}`);
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



    return(
      <UserLink>

        <div className="user-details">

        <h1 className="usersname">{`${detail.firstname} ${detail.lastname} Information`}</h1>
        <br />
        {hidden ? (
          <UserEdit
            toggleView={toggleView}
            detail={detail}
            onUserUpdate={handleUserUpdate}
          />
        ) : (
          <>
            <p className="info-label">
              <span style={{ fontWeight: "bold" }}>User Name:</span>
              {detail.username}
            </p>
            <br />
            <p className="info-label">
              <span style={{ fontWeight: "bold" }}>First Name:</span>
              {detail.firstname}
            </p>
            <br />
            <p className="info-label">
              <span style={{ fontWeight: "bold" }}>Last Name:</span>
              {detail.lastname}
            </p>
            <br />
            <p className="info-label">
              <span style={{ fontWeight: "bold" }}>Email:</span>
              {detail.email}
            </p>
            <br />
            <p className="info-label">
              <span style={{ fontWeight: "bold" }}>Phone Number:</span>
              {detail.phonenumber}
            </p>
          </>
        )}
        <button className="edit" onClick={toggleView}>
          Edit User
        </button>
        </div>
      </UserLink>
    )
}

export default UserDetails