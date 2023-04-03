import { Link } from "react-router-dom";

function Success({user}){

return(
    <div>
        <br></br>
        <h1>Thank You For Your Order!</h1>

        <br></br>

        <p>A Confirmation of your order has been sent to your email Address</p>

        <p>We'll be in touch when your order has been ship </p>
        
        <br></br>

        <Link to={`/userDetails/${user?.id}`}>
        <button className="session-btns">Go To Your Account</button>
        </Link>

        <br></br>
        <br></br>

        <Link to="/">
        <button className="session-btns">Return to the Home Page</button>
        </Link>

    </div>
)

}

export default Success