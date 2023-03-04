import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/forms/createAccount.css";
import Navbar from "../Landing page/Navbar";
import axios from "axios";

export default function CreateAccount() {
  useEffect(() => {
    axios
      .get("/session/", { withCredentials: true })
      .then((res) => (window.location = "/home/profile"))
      .catch((err) => console.log(" "));
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.get("/login/", { withCredentials: true });
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form-back">
      <Navbar />
      <div className="create-acc-form">
        <Link to="/">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div>
          <h1>Cree un compte chez Darek</h1>
          <p>
            Agences immobilières, Promoteurs, vous n'avez pas encore de compte
            sur Darek?
            <br />
            Inscrivez-vous sur le premier site d'annonce immobilière en Algérie.
          </p>
        </div>
        {/* <div className="inputs-row">
          <div className="sign-up-input-ctn">
            <i className="fa-regular fa-user"></i>
            <input type={"text"} placeholder={"Votre nom complet"}></input>
          </div>
          <div className="sign-up-input-ctn">
            <i className="fa-regular fa-envelope"></i>
            <input
              type={"email"}
              className={"sign-up-input"}
              placeholder={"Votre adresse mail"}
            />
          </div>
        </div>
        <div className="inputs-row">
          <div className="sign-up-input-ctn">
            <i className="fa-solid fa-phone"></i>
            <input
              type={"number"}
              placeholder="Votre numero de telephone"
            ></input>
          </div>
          <div className="sign-up-input-ctn">
            <i className="fa-solid fa-eye"></i>
            <input type={"password"} placeholder={"Mot de passe"}></input>
          </div>
        </div>
        <div className="terms">
          <input id="check2" type={"checkbox"}></input> J'accepte les{" "}
          <a href="#">termes et conditions</a> d'utilisation
          <a />
        </div> */}
        <div>
          <button className="connect" onClick={handleLogin}>
            S'inscrire avec Google
          </button>
        </div>
      </div>
    </div>
  );
}
