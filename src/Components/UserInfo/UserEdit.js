import { useState, useEffect } from 'react';
import "./UserEditForm.css"
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
    <div className="user-edit-form-container">
      <form onSubmit={handleSubmit} className='user-edit-form'>
       
        <label htmlFor="firstname" className='label-signup'>First Name:
        <input
          id="firstname"
          type="text"
          required
          className='edit-input'
          value={user.firstname}
          onChange={handleTextChange}
        />
        
        </label>
       
   
        <label htmlFor="lastname" className='label-signup'>Last Name:
        
        <input
          id="lastname"
          className='edit-input'
          type="text"
          required
          value={user.lastname}
          onChange={handleTextChange}
        /> 
        </label>
  
  
      <label htmlFor='phonenumber' className='label-signup'>Phone Number:
      <input
          id="phonenumber"
          type="text"
          className='edit-input'
          required
          value={user.phonenumber}
          placeholder="(xxx)xxx-xxxx"
          onChange={handleTextChange}
        />
        {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
      
      </label>
  
        <input className='user_edit_submit_button' type="submit" />
      </form>
    </div>
)



}


export default UserEdit