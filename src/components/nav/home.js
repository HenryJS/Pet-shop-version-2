import React from "react";
import "./styles/home.css";
import {FiArrowRight} from "react-icons/fi";
import BannerBackground from "../assets/home-banner-background.png";

import BannerImage from "../assets/home-banner-image.jpg";



const Home = () => {

    return (
      <div className="home-container">

        <div className="home-banner-container">
          <div className="home-bannerImage-container">
             <img src={BannerBackground} alt="" />
          </div>
          <div className="home-text-section">
            <h1 className="primary-heading">
            Your Journey of Owning a New Friend Starts Here!  
            </h1> 
            <p className="primary-text">
            Dog lovers know something that no one else does: there’s no purer form of love than the kind you get from your four-legged family. Here is a collection of adorable friends. 
            </p>
            <button className="secondary-button">
              Explore More <FiArrowRight /> 
            </button>
          </div>
          <div className="home-image-container">
          <img src={BannerImage} alt="" />
          </div>
        </div>
      </div>
    );
  };

  export default Home;