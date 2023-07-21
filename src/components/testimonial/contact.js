import React from 'react';

import "./styles/contact.css";


const Contact = () => {
  return <div className="contact-page-wrapper">
            <h1 className="primary-heading">Do You Have a Question?</h1>
            <h1 className="primary-heading">Feel Free to Ask :)</h1>
            <div className="contact-form-container">
                <input type="text"  placeholder="example@gmail.com"/>
                <button className="secondary-button">Submit</button>
            </div>
        </div>
  
};

export default Contact;