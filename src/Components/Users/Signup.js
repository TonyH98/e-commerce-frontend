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
        password: '',
      });
    
      const handleTextChange = (event) => {
        setUser({ ...user, [event.target.id]: event.target.value });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        addUser(user);
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
