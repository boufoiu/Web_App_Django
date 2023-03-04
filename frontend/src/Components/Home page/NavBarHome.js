import React, { useState, useEffect } from "react";
import "../../styles/home page/home/navBarHome.css";
import logo from "../../images/logo-home.png";
import { Link } from "react-router-dom";
import axios from "axios";
export default function NavBarHome() {
  const [islogged, setislogged] = useState(false);

  useEffect(() => {
    axios
      .get("/session/", { withCredentials: true })
      .then(() => setislogged(true))
      .catch(() => setislogged(false));
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get("/logout/", { withCredentials: true });
      window.location = "/connect";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="nav-bar-home">
        <Link to="/">
          <img src={logo} />
        </Link>

        <div className="parameters">
          <Link to="/home/">
            <div className="parameter">
              <i className="fa-sharp fa-solid fa-house"></i>Accueil
            </div>
          </Link>
          <Link to="/home/messages">
            <div className="parameter">
              <i className="fa-solid fa-message"></i>Messagerie
            </div>
          </Link>
          <Link to="/home/favorites">
            <div className="parameter">
              <i className="fa-solid fa-heart"></i>Favoris
            </div>
          </Link>
          <Link to="/home/profile">
            <div className="parameter">
              <i className="fa-solid fa-user"></i>Profile
            </div>
          </Link>
          <Link to="/home/help">
            <div className="parameter">
              <i className="fa-solid fa-circle-info"></i>Aide
            </div>
          </Link>
        </div>
        {islogged ? (
          <div onClick={handleLogout} className="disconnect parameter">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Deconnexion
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
