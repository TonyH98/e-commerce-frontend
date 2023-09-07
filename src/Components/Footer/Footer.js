
import {  DiscordLogo } from "phosphor-react";

import {FacebookLogo} from "phosphor-react"

import {TwitterLogo} from "phosphor-react"

import { Link } from "react-router-dom"

import "./Footer.css"

function Footer(){
    return (
        <footer>
        
        <h4 className="footer-name">Collection Vault</h4>

        <div className="footers">
            <div className="footer-section-one">
                <h3 className="footer_header">Contact Info</h3>
                <p className="footer-link">Career</p>
                <p className="footer-link">Contact Us</p>
                <p className="footer-link">Blog</p>
            </div>
            <div className="footer-section-two">
            <h3 className="footer_header">Resources</h3>
                <p className="footer-link">Help Center</p>
                <p className="footer-link">Communnity Guideline</p>
                <p className="footer-link">Return Policy</p>
            </div>
            <div className="footer-section-four">
            <h3 className="footer_header">Policies</h3>
                <Link to="/login">
                <p className="footer-link">Create an Account</p>
                </Link>
                <p className="footer-link">Cookies Policy</p>
                <p className="footer-link">Term of Service</p>
            </div>
        </div>
        </footer>
    )
}

export default Footer