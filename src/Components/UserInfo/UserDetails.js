import { useNavigate } from "react-router-dom";
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
        <div className="userInfo">
          <h1>User Information</h1>
          <p>{`First Name: ${detail.firstname}`}</p>
          <p>{`Last Name: ${detail.lastname}`}</p>
          <p>{`Email: ${detail.email}`}</p>
        </div>
        <div className="userLink">

        </div>
      </div>
    )
}


export default UserDetails