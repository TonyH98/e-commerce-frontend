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

  return (
    <div className="New">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          value={login.username}
          type="text"
          onChange={handleTextChange}
          required
        />
        <br></br>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          required
          value={login.password}
          placeholder="******"
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" />
      </form>
      {error && <p>{error}</p>}
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}

export default Login;
