
import "./password.css"
import {AiFillCloseCircle} from "react-icons/ai"
function Password({open, onClose}){

if(!open) return null

    return(
        <div className="modal-overlay">
        <div className="modal-container2">
          <div className="modalRight2">
            <button className="closeBtn2" onClick={onClose}><AiFillCloseCircle size={20}/></button>
          </div>
          <div className="content">
          <h2>Password Requirements:</h2>
            <ul>
                <li>8 Characters Long</li>
                <li>1 Uppercase Letter</li>
                <li>1 Lowercase Letter</li>
                <li>1 Special Character(@$!%*#?&)</li>
                <li>1 Number</li>
            </ul>

          </div>

        </div>



    </div>
    )
}

export default Password
