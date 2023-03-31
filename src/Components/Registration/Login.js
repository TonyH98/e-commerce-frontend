import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function Login({ newLogin }) {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });
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
      })
      .catch((err) => {
        setError(err.response.data.message);
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
    <div>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit} className="login-form">
        <br></br>
      <h1>Login</h1>
        <label htmlFor="username" className='label-signup'>Username:</label>
        <br></br>
        <input
          id="username"
          value={login.username}
          type="text"
          onChange={handleTextChange}
          required
        />
        <br></br>
        <br></br>
        <label htmlFor="password" className='label-signup'>Password:</label>
        <br></br>
        <input
          id="password"
          type={type}
          required
          value={login.password}
          placeholder="******"
          onChange={handleTextChange}
        />

<br></br>
        <input
        type="checkbox"
        onClick={handleType}
        />{type === "password" ? "Show Password" : "Hide Password"}
        <br />
        <input type="submit" />
        <br />
        <input type="submit" />
        <br></br>
      {error && <p>{error}</p>}
      <Link to="/signup">
        <button className='registory-btn'>Sign Up</button>
      </Link>
      </form>
    </div>
  );
}

export default Login;
