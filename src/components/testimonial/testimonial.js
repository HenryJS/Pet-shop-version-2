import React from 'react';
import ProfilePic from"../assets/john-doe-image.png";
import { AiFillStar} from "react-icons/ai";


import "./styles/testimonial.css";

const Testimonial = () => {
  return <div className="work-section-wrapper">
            <div className="work-section-top">
                <p className="primary-subheading">Testimonials</p>
                <h1 className="primary-heading">What They are Saying</h1>
                <p className="primary-text">
“A dog is the only thing on earth that loves you more than you love yourself.” ...</p>
            </div>
            <div className="testimonial-section-bottom">
                <img src={ProfilePic} alt="" />
                <p>
                
“Amy is a wonderful pet sitter who takes excellent care of our furry troop! Right off the bat when we first met her we got an excellent first impression. She is very warm and friendly and was great with our pets! When we came home after our weekend away our pets were relaxed and happy.
                </p>
                <div className="testimonials-stars-container">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                </div>
                <h2>John Henry</h2>
            </div>
    
        </div>
};

export default Testimonial;