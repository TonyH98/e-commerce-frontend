import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function Signup(){

  const [type, setType]=useState('password');

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
        firstname: '',
        lastname: '',
        email: '',
        phonenumber:'',
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

      const handleType =() => {
        if(type === 'password'){
          setType('text')
        }
        else if (type === "text"){
          setType('password')
        }
      }

return(
    <div className="signup-section">

        <br></br>
      <form onSubmit={handleSubmit} className="signup-form">
      <h1>Sign Up Form</h1>
        <label htmlFor="username" className='label-signups'>Username:</label>
      
        <input
          id="username"
          className='signup-input'
          value={user.username}
          type="text"
          onChange={handleTextChange}
          required
        />
        <br></br>
        <label htmlFor="firstname" className='label-signups'>First Name:</label>
 
        <input
          id="firstname"
          className='signup-input'
          type="text"
          required
          value={user.firstname}
          onChange={handleTextChange}
        />
        <br></br>
         <label htmlFor="lastname" className='label-signups'>Last Name:</label>

        <input
          id="lastname"
          type="text"
          className='signup-input'
          required
          value={user.lastname}
          onChange={handleTextChange}
        />
        <br></br>
         <label htmlFor="email" className='label-signups'>Email:</label>
  
        <input
          id="email"
          type="email"
          className='signup-input'
          required
          value={user.email}
          onChange={handleTextChange}
        />
         {emailError && <p style={{color:"red"}}>{emailError}</p>}
      <br></br>
      <label htmlFor='phonenumber' className='label-signups'>Phone Number:</label>
      <input
          id="phonenumber"
          type="text"
          className='signup-input'
          required
          value={user.phonenumber}
          placeholder="(xxx)xxx-xxxx"
          onChange={handleTextChange}
        />
        
        {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
        <br></br>
        <label htmlFor="password" className='label-signups'>Password:</label>

        <input
          id="password"
          className='signup-input'
          type={type}
          required
          value={user.password}
          placeholder="******"
          onChange={handleTextChange}
          />
        {passwordError && <p style={{color:"red"}}>{passwordError}</p>}
        <br></br>
        <input
        type="checkbox"
        onClick={handleType}
        />{type === "password" ? "Show Password" : "Hide Password"}
        <br />
        <input type="submit" />
        <br></br>
      <Link to="/login">
      <button className='sign-btn'>Sign In</button>
      </Link>

      {/* <div className='password-requirment'>
        <p style={{fontWeight:"bold", fontSize: "18px"}}>Password Reqirment:</p>

        <ul>
        <li><span>8 Characters Long</span></li>
        <li><span>1 Uppercase Letter</span></li>
        <li><span>1 Lowercase Letter</span></li>
        <li><span>1 Number</span></li>
         <li><span>1 Special Character</span></li>
        </ul>
      </div> */}
      </form>



    </div>
)



}


export default Signup
