import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function Signup(){

    let navigate = useNavigate()

    const addUser = (newUser) => {
        axios
      .post(`${API}/users/signup`, newUser)
      .then(
        () => {
          navigate(`/login`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn('catch', c));
    }

    const [user, setUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber:'',
        password: '',
      });
    
      const [passwordError, setPasswordError] = useState("");

      const [emailError, setEmailError] = useState("");

      const [phoneError, setPhoneError] = useState("")

      const handleTextChange = (event) => {
        setUser({ ...user, [event.target.id]: event.target.value });
      };

      function validatePassword(){
       const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[0-9a-zA-Z@$!%*?&]{8,}$/

       return validate.test(user.password)
      }

      function validateEmail(){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!regex.test(user.email)){
          return false
        }
        return true
      }

      function validatePhoneNumber(){
        const phoneRegex = /^\(\d{3}\)\d{3}-\d{4}$/;
        return phoneRegex.test(user.phoneNumber)
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        if(validatePassword()){
          addUser(user);
        }
        else{
          setPasswordError("Password must have at least 8 characters long, 1 uppercase letter, 1 lowercase letter, 1 number, and a special character ")
        }
        if(validateEmail()){
          addUser(user)
        }
        else{
          setEmailError("Please enter a valid email address")
        }
        if(!validatePhoneNumber()){
          setPhoneError("Please enter in the require format of (xxx)xxx-xxxx")
        }
        else{
          addUser(user)
        }
      };

      

return(
    <div className="New">
      <h1>Sign Up Form</h1>
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
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          required
          value={user.firstName}
          onChange={handleTextChange}
        />
        <br></br>
         <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          required
          value={user.lastName}
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
      <label htmlFor='phoneNumber'>Phone Number:</label>
      <input
          id="phoneNumber"
          type="text"
          required
          value={user.phoneNumber}
          placeholder="(xxx)xxx-xxxx"
          onChange={handleTextChange}
        />
        
        {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
        <br></br>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          required
          value={user.password}
          placeholder="******"
          onChange={handleTextChange}
        />
        {passwordError && <p style={{color:"red"}}>{passwordError}</p>}
        <br />
        <input type="submit" />
      </form>
      <Link to="/login">
      <button>Sign In</button>
      </Link>
    </div>
)



}


export default Signup
