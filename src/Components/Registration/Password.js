
function Password({open, onClose}){

if(!open) return null

    return(
        <div className="overlay">
           <div className="modal-container">
            <div className="modalRight">
                <p className="closeBtn" onClick={onClose}>X</p>
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
