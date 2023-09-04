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
        .catch((error) => {
          console.error(error);
        });
    }, [hidden]);
  
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
         <div className="info-container">
  <div className="info-item">
    <span className="info-label">User Name:</span>
    <span className="info-value">{detail.username}</span>
  </div>

  <div className="info-item">
    <span className="info-label">First Name:</span>
    <span className="info-value">{detail.firstname}</span>
  </div>

  <div className="info-item">
    <span className="info-label">Last Name:</span>
    <span className="info-value">{detail.lastname}</span>
  </div>

  <div className="info-item">
    <span className="info-label">Email:</span>
    <span className="info-value">{detail.email}</span>
  </div>

  <div className="info-item">
    <span className="info-label">Phone Number:</span>
    <span className="info-value">{detail.phonenumber}</span>
  </div>
</div>

          </>
        )}
        {!hidden ? (
        <button className="edit user-edit-button" onClick={toggleView}>
          Edit User
        </button>


        ): null}
        </div>
      </UserLink>
    )
}

export default UserDetails