import { useState, useEffect} from "react";
import Purchase from "./Purchase"
import axios from "axios"

import UserLink from "../UserInfo/UserLink"


import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";


const API = process.env.REACT_APP_API_URL;

const pageData = 2

function Purchases({user}){

    const [purchases, setPurchases] = useState([])
    const [filterPurchases, setFilterPurchases] = useState([])
    const [search , setSearch] = useState("")

    const [currentPage, setCurrentPage] = useState(0)


    let navigate = useNavigate()

    useEffect(() => {
        axios
          .get(`${API}/users/${user?.id}/purchases`)
          .then((res) => {
            setPurchases(res.data);
            setFilterPurchases(res.data)
          })
          .catch((c) => console.warn("catch, c"));
      }, []);

console.log(purchases)


    return(
        <UserLink>

           
        </UserLink>
    )
}

export default Purchases