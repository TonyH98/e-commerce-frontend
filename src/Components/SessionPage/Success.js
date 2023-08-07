import { Link } from "react-router-dom";
import "./Success.css"


function Success({user}){

return(
    <div className="success-container">
      
        <h1>Thank You For Your Order!</h1>

        <div className="success-message-container">

        <p>A Confirmation of your order has been sent to your email Address</p>

        <p>We'll be in touch when your order has been ship </p>

        </div>
        
    
        <div className="session-buttons-container">

        <Link to={`/userDetails/${user?.id}`}>
        <button className="session-btns">Go To Your Account</button>
        </Link>

        <Link to="/">
        <button className="session-btns">Return to the Home Page</button>
        </Link>

        </div>

    </div>
)

}

export default Success