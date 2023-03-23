import { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function UserEdit(props) {

const {detail} = props

  const [user, setUser] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: ''
  });

  const [emailError, setEmailError] = useState("");

  const [phoneError, setPhoneError] = useState("")

  const handleTextChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(user.email)) {
      return false
    }
    return true
  }

  function validatePhoneNumber() {
    const phoneRegex = /^\(\d{3}\)\d{3}-\d{4}$/;
    return phoneRegex.test(user.phonenumber)
  }

  function handleEdit() {
    axios
      .put(`${API}/users/${detail.id}`, user)
      .then((res) => {
        setUser(res.data);
        // navigate(`/login`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (detail) {
      setUser(detail)
    }
  }, [detail, detail.id, props])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateEmail() && validatePhoneNumber()) {
      handleEdit()
      if (detail) {
        props.toggleView()
      }
    }
    else if (!validateEmail()) {
      setEmailError("Please enter a valid email address")
    }
    else if (!validatePhoneNumber()) {
      setPhoneError("Please enter in the require format of (xxx)xxx-xxxx")
    }
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          value={user.username}
          type="text"
          onChange={handleTextChange}
          required
        />
        <br></br>
        <label htmlFor="firstname">First Name:</label>
        <input
          id="firstname"
          type="text"
          required
          value={user.firstname}
          onChange={handleTextChange}
        />
        <br></br>
        <label htmlFor="lastname">Last Name:</label>
        <input
          id="lastname"
          type="text"
          required
          value={user.lastname}
          onChange={handleTextChange}
        />
        <br></br>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          required
          value={user.email}
          onChange={handleTextChange}
        />
         {emailError && <p style={{color:"red"}}>{emailError}</p>}
      <br></br>
      <label htmlFor='phonenumber'>Phone Number:</label>
      <input
          id="phonenumber"
          type="text"
          required
          value={user.phonenumber}
          placeholder="(xxx)xxx-xxxx"
          onChange={handleTextChange}
        />
        {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
        <br></br>
        <br />
        <input type="submit" />
      </form>
    </div>
)



}


export default UserEdit