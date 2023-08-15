import React from 'react';
import Logo from "../assets/Logo.jpg";
import {BsTwitter} from "react-icons/bs";
import {SiLinkedin} from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF} from "react-icons/fa";

import "./style/footer.css";


const Footer = () => {
  return   <div className="footer-wrapper">
                <div className="footer-section-one">
                    <div className="footer-logo-container">
                       <img src={Logo} alt="" /> 
                    </div>
                    <div className="footer-icons">
                        <BsTwitter/>
                        <SiLinkedin/>
                        <BsYoutube/>
                        <FaFacebookF/>
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
}

export default Footer;