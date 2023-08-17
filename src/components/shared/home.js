import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link as ScrollLink } from 'react-scroll';
import BannerBackground from "../assets/home3.jpg";
import "./styles/home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
      <div className="home-banner-image-container" style={{ backgroundImage: `url(${BannerBackground})` }}></div>
        <div className="home-text-section">
          <h1 className="primary-heading1">
            Your Journey of Owning a New Friend Starts Here!
          </h1>
          <p className="primary-text1">
            Dog lovers know something that no one else does: there’s no purer
            form of love than the kind you get from your four-legged family.
            Here is a collection of adorable friends.
          </p>
          <ScrollLink to="breeds" smooth={true} duration={500}>
        <button className="secondary-button">
          Adopt Now <FiArrowRight />
        </button>
      </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
