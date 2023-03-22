import { useNavigate, Link } from "react-router-dom";
import {useEffect , useState} from 'react'
import axios from "axios";


const API = process.env.REACT_APP_API_URL;

function UserDetails({user}){

  const [detail, setDetail] = useState({})

const navigate = useNavigate()

const handleLogout = () => {
  localStorage.clear()

  fetch('/logout', {
    method: "POST",
    credentials: 'include',
  })
  .then(() => {
    navigate('/login')
  })
  .catch((error) => {
    console.error(error)
  })
}

useEffect(() => {
axios.get(`${API}/users/${user?.id}`)
.then((res) => {
  setDetail(res.data)
})
},[])

console.log(detail)


    return(
      <div className="userDetails">

        <div className="userLink">
          <Link to={`/favorites/${user?.id}`}>
        <p>Favorite Item</p>
          </Link>
        <br></br>

        <Link to= {`/searchHistory/${user?.id}`}>

        <p>Search History</p>
        </Link>

        <br></br>

        <Link to={`/purchaseHistory/${user?.id}`}>
        <p>Purchase History</p>
        </Link>

        <br></br>
      
        <div className="darkmode">
       
        <input className="toggle"type="checkbox" />
        
        </div>

        <br></br>
        <button onClick={handleLogout} >Logout</button>

        </div>
      
      <div className="vertical"></div>

        <div className="userInfo">
          <h1>{`${detail.firstname} ${detail.lastname} Information`}</h1>
          <br></br>
          <p><span style={{fontWeight:"bold"}}>First Name:</span>{detail.firstname}</p>
          <br></br>
          <p><span style={{fontWeight:"bold"}}>Last Name:</span>{detail.lastname}</p>
          <br></br>
          <p><span style={{fontWeight:"bold"}}>Email:</span>{detail.email}</p>
          <br></br>
          <p><span style={{fontWeight:"bold"}}>Phone Number:</span>{detail.phonenumber}</p>
        </div>
      </div>
    )
}


export default UserDetails