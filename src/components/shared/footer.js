import React from 'react';
import {BsTwitter} from "react-icons/bs";
import {SiLinkedin} from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF} from "react-icons/fa";
import Logo from "../assets/logo.jpg";
import './styles/footer.css';

export default function Footer(){
    return(
        <div className="footer-wrapper">
            <div className="footer-section-one">
                <div className="footer-logo-container">
                    <img src={Logo} alt="" />
                </div>
                <div className="footer-icons">
                    <a href='https://x.com' target='_blank' rel='noreferrer'><BsTwitter/></a>
                    <a href='https://linkedin.com' target='_blank' rel='noreferrer'><SiLinkedin/></a>
                    <a href='https://youtube.com' target='_blank' rel='noreferrer'><BsYoutube/></a>
                    <a href='https://facebook.com' target='_blank' rel='noreferrer'> <FaFacebookF/></a>
                </div>
            </div>
            <div className="footer-section-two">
                <div className="footer-section-columns">
                    <span>Quality</span>
                    <span>Help</span>
                    <span>Share</span>
                    <span>Carrers</span>
                    <span>Testimonials</span>
                    <span>Work</span>
                </div>
                <div className="footer-section-columns">
                    <span>+254726177576</span>
                    <span>petcare@co.ke</span>
                    <span>eldopets@gmail.com</span>
                    <span>contact@gmail.com</span>
                </div>
                <div className="footer-section-columns">
                    <span>Terms and Conditions</span>
                    <span>Privacy Policy</span>
                    
                </div>
            </div>
        </div>
    )
}