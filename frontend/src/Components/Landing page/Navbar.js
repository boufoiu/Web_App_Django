import React from "react";
import "../../styles/landing-page/Navbar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="full-nav">
      <img src={logo} className="logo-img"></img>
      <div className="nav" id="navv">
        <ul className="nav-list">
          <li>
            {" "}
            <a href="/home">Location</a>
          </li>
          <li>
            {" "}
            <a href="/home">Vente</a>
          </li>
          <li>
            {" "}
            <a href="/home">Echange</a>
          </li>
          <li>
            {" "}
            <a href="/home">A propos</a>
          </li>
        </ul>
        <div className="log-in">
          <Link to="/sign-in" className="sign-up">
            Sign up
          </Link>
          <Link to="/connect">
            <button className="connect-button">Connexion</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
