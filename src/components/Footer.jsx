// Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* About */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">MyCompany</h5>
            <p>
              MyCompany is dedicated to providing the best products and services
              to our customers. Quality and trust are at the core of everything
              we do.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-light text-decoration-none">Home</a></li>
              <li><a href="#about" className="text-light text-decoration-none">About</a></li>
              <li><a href="#services" className="text-light text-decoration-none">Services</a></li>
              <li><a href="#contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="http://github.com/axehacker418/" className="text-light fs-5"><FaGithub /></a>
              <a href="https://www.instagram.com/saurabh_lakshkar_418/" className="text-light fs-5"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/saurabh-lakshkar-77ab90268/" className="text-light fs-5"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        <hr className="bg-light" />

        <div className="row">
          <div className="col text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} MyCompany. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

