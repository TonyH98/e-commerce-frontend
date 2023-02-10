import FusionCharts from "fusioncharts"
import ReactFC from "react-fusioncharts"
import pie2D from "fusioncharts/fusioncharts.charts"
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion"


import { useState , useEffect} from "react";
import { useParams , Link } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL


ReactFC.fcRoot(FusionCharts, pie2D, FusionTheme);





function ReviewChart(){
     const [reviews , setReviews] = useState([])

const {id} = useParams()


    useEffect(()=> {
        axios.get(`${API}/products/${id}/reviews`)
        .then((res) => setReviews(res.data))
        .catch(err => console.log(err))
      }, [])


function getByRating(data){
    const filter = reviews.filter((x) => {
        return(
            x.rating === data
        )
    })
    return filter

}
    

    const chartConfigs = {
      type: "pie2d",
      width: "700", 
      height: "400",
      dataFormat: "json", 
      dataSource: {
        chart: {
          caption: "Products Reviews",    
          xAxisName: "Rating",
          yAxisName: "Number of Reviews",
          
          theme: "fusion"                
        },

       
        data:[
            {label: "Rating: 0", value: getByRating("0").length},
            {label: "Rating: 1", value: getByRating("1").length},
            {label: "Rating: 2", value: getByRating("2").length},
            {label: "Rating: 3", value: getByRating("3").length},
            {label: "Rating: 4", value: getByRating("4").length},
            {label: "Rating: 5", value: getByRating("5").length},
        ]
      }
    };


    return(
        <div>
            { reviews.length === 0 ? <h1>No Reviews Provided</h1> : <ReactFC {...chartConfigs} />}
            <Link to={`/products/${id}`}>
            <button>Go Back</button>
            </Link>
        </div>
    )
}

export default ReviewChart