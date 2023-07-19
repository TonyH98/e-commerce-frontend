import { useState } from "react"

function ReadMore({children}){

  const [hidden , setHidden] = useState(false)

  const toggleView = () => {
    setHidden(!hidden)
  }


    // return(
    //     <p className="readmore" >
    //        {hidden ? children : `${children.substring(0, 200)}`}
    //        <br></br>
    //        {children.length > 200 ? <button onClick={toggleView} className="readmore-btn">{!hidden ? `Read More...` : `Read Less...` }</button> : null}
           
    //     </p>
    // )
}

export default ReadMore