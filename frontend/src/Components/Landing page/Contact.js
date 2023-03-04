import React from "react";
import contactImage from "../../images/biglogo.png";
import "../../styles/landing-page/contact.css";

export default function Contact() {
  return (
    <div className="contact">
      <div className="contact-text">
        <div className="org-text contact-title1">contact</div>
        <div className=" contact-title2">
          Contactez nous
          <br /> facilement
        </div>
        <div className="contact-desc">
          Vous aussi, Vous êtes un(e) Agence immobilière ! Donner de la
          visibilité a votre Agence immobilière et de vos annonces immobilieres,
          inscrivez-vous gratuitement sur Dar Jadida et publiez vos
          announcements immobilieres
        </div>
        <div className="contact-btn-container">
          <button className="tlphn-btn">
            <i className="fa-solid fa-phone"></i> Telephone
          </button>
          <button className="email-btn">
            <i className="fa-regular fa-envelope"></i> Email
          </button>
        </div>
      </div>
      <img src={contactImage} className="contact-logo"></img>
    </div>
  );
}
