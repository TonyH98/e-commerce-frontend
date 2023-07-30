import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Password from './Password';
import { Info } from 'phosphor-react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function Signup(){

  const [type, setType]=useState('password');

  


  const [modal , setModal] = useState(false)
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
       const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#!%*?&])[0-9a-zA-Z@$!%*?&]{8,}$/

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
        return phoneRegex.test(user.phonenumber)
      }

      let [userError , setUserError] = useState("")
     
      let [emailError2 , setEmailError2] = useState("")

      function checkUserName() {
        return axios.get(`${API}/users?username=${user.username}`)
          .then((res) => {
            return res.data.length === 0;
          })
          .catch((error) => {
            console.error(error);
            return false;
          });
      }

      function checkEmail(){
        return axios.get(`${API}/users?email=${user.email}`)
        .then((res) => {
          return res.data.length === 0;
        })
        .catch((error) => {
          console.error(error);
          return false;
        });
      }

      const handleSubmit = (event) => {
        event.preventDefault();
      
        let isValid = true;
      
        if (!validatePassword()) {
          setPasswordError("Password must have at least 8 characters long, 1 uppercase letter, 1 lowercase letter, 1 number, and a special character ");
          isValid = false;
        }
      
        if (!validateEmail()) {
          setEmailError("Please enter a valid email address");
          isValid = false;
        }
      
        if (!validatePhoneNumber()) {
          setPhoneError("Please enter in the require format of (xxx)xxx-xxxx");
          isValid = false;
        }
      
        Promise.all([checkUserName(), checkEmail()]).then(([isUsernameAvailable, isEmailAvailable]) => {
          if (!isUsernameAvailable) {
            setUserError("Username was already taken");
            isValid = false;
          }
      
          if (!isEmailAvailable) {
            setEmailError2("Email was already taken");
            isValid = false;
          }
      
          if (isValid) {
            addUser(user);
          }
        }).catch((error) => {
          console.error(error);
        });
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

        
      <form onSubmit={handleSubmit} className="signup-form">
        <button onClick={() => setModal(true)} className="modal-btn"><Info size={18}/></button>
      <h1>Sign Up Form</h1>
        <label htmlFor="username" className='label-signup'>Username:</label>
        
        <input
          id="username"
          className='signup-input'
          value={user.username}
          type="text"
          onChange={handleTextChange}
          required
        />
         {userError && <p style={{color:"red"}}>{userError}</p>}
       
        <label htmlFor="firstname" className='label-signup'>First Name:</label>
  
        <input
          id="firstname"
          className='signup-input'
          type="text"
          required
          value={user.firstname}
          onChange={handleTextChange}
        />
  
         <label htmlFor="lastname" className='label-signup'>Last Name:</label>
 
        <input
          id="lastname"
          type="text"
          className='signup-input'
          required
          value={user.lastname}
          onChange={handleTextChange}
        />
     
         <label htmlFor="email" className='label-signup'>Email:</label>
   
        <input
          id="email"
          type="email"
          className='signup-input'
          required
          value={user.email}
          onChange={handleTextChange}
        />
         {emailError && <p style={{color:"red"}}>{emailError}</p>}
         {emailError2 && <p style={{color:"red"}}>{emailError2}</p>}

      <label htmlFor='phonenumber' className='label-signup'>Phone Number:</label>

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
  
        <label htmlFor="password" className='label-signup'>Password:</label>
 
        <input
          id="password"
          className='signup-input'
          type={type}
          required
          value={user.password}
          placeholder="******"
          onChange={handleTextChange}
          />
          <Password open={modal} onClose={() => setModal(false)}/>
        {passwordError && <p style={{color:"red"}}>{passwordError}</p>}

        <input
        type="checkbox"
        onClick={handleType}
        />
        <span style={{color: "white"}}>{type === "password" ? "Show Password" : "Hide Password"} </span>
        <input type="submit" />
  
      <Link to="/login">
      <button className='sign-btn'>Sign In</button>
      </Link>

      </form>
    </div>
)



}


export default Signup
