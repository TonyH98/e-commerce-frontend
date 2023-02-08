import { useState } from "react"

function ReadMore({children}){

    const [viewEditForm , toggleEditForm] = useState(false)

  const toggleView = () => {
    toggleEditForm(!viewEditForm)
  }


    return(
        <div className="read-more">
           {viewEditForm ? children : children.substring(0, 200)}
           {children.length > 200 ? <button onClick={toggleView}>{!viewEditForm ? `Read More` : `Read Less` }</button> : null}
           
        </div>
    )
}

export default ReadMore