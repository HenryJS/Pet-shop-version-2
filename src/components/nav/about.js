import React from 'react';
import AboutBackground from "../assets/about-background.png";
import AboutBackgroundImage from "../assets/contact_img.png";

import "./styles/about.css";

 


const About = () => {
  return <div className="about-section-container">
            <div className="about-background-image-container">
                <img src={AboutBackground} alt="" />
            </div> 
            <div className="about-section-image-container">
                <img src={AboutBackgroundImage} alt="" />
            </div>
            <div className="about-section-text-container">
                <p className="primary-subheading"> About </p>
                <h1 className="primary-heading">
                    Who is your Bestfriend?
                </h1>
                <p className="primary-text">
                    Nothing Beats the Joy of Coming Home to a loyal companion and freind!
                </p>
                <p className="primary-text">
                Pets are known to decrease stress, improve heart health, and even help children with their emotional and social skills
                </p>
            <div className="about-buttons-container">
                <button className="secondary-button"> Learn more</button>
                

            </div>

            </div>
         </div>
  
};

export default About; 