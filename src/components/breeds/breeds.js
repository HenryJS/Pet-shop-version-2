import React from 'react';
import AboutBackground from "../assets/about-background.png";
import AboutBackgroundImage from "../assets/contact_img.png";
import "./style/breeds.css"
import { NavLink } from 'react-router-dom';

const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  };
const Breeds = () => {
  return  <div className="about-section-container" id="breeds">
            <div className="about-background-image-container">
                <img src={AboutBackground} alt="" />
            </div> 
            <div className="about-section-image-container">
                <img src={AboutBackgroundImage} alt="" />
            </div>
            <div className="about-section-text-container">
                <p className="primary-subheading"> Available Breeds </p>
                <h1 className="primary-heading">
                    Who is your Bestfriend?
                </h1>
                <p className="primary-text">
                    Nothing Beats the Joy of Coming Home to a loyal companion and freind!
                </p>
                <p className="primary-text">
                "Ready to meet our adorable furry friends? Explore our delightful collection of pets on the Products page! Click below to embark on a heartwarming journey full of cuteness and joy! 🐾"
                </p>
            <div className="about-buttons-container">
            <NavLink to="/products" onClick={scrollToTop}>
                <button className="secondary-button"> Begin Adventure!🐾</button>
            </NavLink>
            </div>

            </div>
         </div>
  
};

export default Breeds; 