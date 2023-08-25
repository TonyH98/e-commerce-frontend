import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import "./Login.css"

import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function Login({ newLogin }) {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  let navigate = useNavigate()

  const [error, setError] = useState(null);
  const [type, setType]=useState('password');

  const handleTextChange = (event) => {
    setLogin({ ...login, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API}/users/login`, login)
      .then((res) => {
        newLogin();
        window.localStorage.setItem(
          'user',
          JSON.stringify({ username: res.data.username, id: res.data.id })
        );
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError("Incorrect username or password, Please refresh to try again!");
        } else {
          setError("An error occurred while logging in");
        }
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



  return (
    <div className='login-form-container'>
      
      <form onSubmit={handleSubmit} className="login-form">
      <h1>Login</h1>
   
        <label htmlFor="username" className='label-signup'>Username:
        
        <input
          id="username"
          value={login.username}
          type="text"
          onChange={handleTextChange}
          className='login_input'
          required
        />
        </label>
    
      
        <label htmlFor="password" className='label-signup'>Password:
        
        <input
          id="password"
          type={type}
          className='login_input'
          required
          value={login.password}
          placeholder="******"
          onChange={handleTextChange}
        />
        </label>
   

      <div>

        <input
        type="checkbox"
        onClick={handleType}
        />
        <span style={{color: "white"}}>{type === "password" ? "Show Password" : "Hide Password"}</span>
      </div>

       <input disabled={error} type='submit'/>
     
      {error && <p style={{color: "red"}}>{error}</p>}
      <Link to="/signup">
        <button className='registory-btn'>Sign Up</button>
      </Link>
      </form>
    </div>
  );
}

export default Login;
