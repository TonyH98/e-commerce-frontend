

function Footer(){
    return (
        <footer>

        <div className="footers">
            <div className="footer-section-one">
                <p className="footer-link">Career</p>
                <p className="footer-link">Contact Us</p>
                <p className="footer-link">Blog</p>
            </div>
            <div className="footer-section-two">
                <p className="footer-link">Help Center</p>
                <p className="footer-link">Communnity Guideline</p>
                <p className="footer-link">Return Policy</p>
            </div>
            <div className="footer-section-four">
                <p className="footer-link">Create an Account</p>
                <p className="footer-link">Cookies Policy</p>
                <p className="footer-link">Term of Service</p>
            </div>
        </div>
        <hr></hr>
        <p style={{color: "white"}}>

        <span style={{color:"white"}}  dangerouslySetInnerHTML={{ "__html": "&copy;" }} />2023 Tony Hoang. All Rights Reserved
        </p>

        </footer>
    )
}

export default Footer