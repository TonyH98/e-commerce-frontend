import { FaStar } from "react-icons/fa"
import "./ReviewProgress.css"

function ReviewProgress({state, review, index}){

   function indexChange (){
       if(index === 0){
           return "5"
       }
       if(index === 1){
           return "4"
       }
       if(index === 2){
           return "3"
       }
       if(index === 3){
           return "2"
       }
       if(index === 4){
           return "1"
       }
   }

    const fixWidth = 300
    const blueWidth = (fixWidth * Number(state.length)) / review.length
    const whiteWidth = fixWidth - blueWidth


    return(
        <div className="chart">
        <div><span style={{color: "white"}}>{indexChange()}</span><FaStar size={10} color="yellow"/></div>

        <div className="progress-bar" style={{ width: `${fixWidth}px` }}>
      <div className="blue" style={{ width: `${blueWidth}px` }}></div>
      <div className="white" style={{ width: `${whiteWidth}px` }}></div>
    </div>

    <div><span style={{color: "white"}}>{state.length}</span></div>

    </div>
    )
}

export default ReviewProgress