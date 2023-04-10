
import {  DiscordLogo } from "phosphor-react";

import {FacebookLogo} from "phosphor-react"

import {TwitterLogo} from "phosphor-react"

import { Link } from "react-router-dom"

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
                <Link to="/login">
                <p className="footer-link">Create an Account</p>
                </Link>
                <p className="footer-link">Cookies Policy</p>
                <p className="footer-link">Term of Service</p>
            </div>
        </div>
        <hr></hr>
        <p style={{color: "black"}}>

        <span style={{color:"black"}}  dangerouslySetInnerHTML={{ "__html": "&copy;" }} />2023 Tony Hoang. All Rights Reserved
        <div className="social-media-logos">
            <DiscordLogo color="black" size={30}/>
            <FacebookLogo color="black" size={30}/>
            <TwitterLogo color="black" size={30}/>
        </div>
        </p>

        </footer>
    )
}

export default Footer