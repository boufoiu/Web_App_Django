import React from "react";
import "../../styles/landing-page/subscription.css";
import subImage from "../../images/sub-img.jpg";
import Typewriter from "typewriter-effect";

export default function Subscription() {
  return (
    <div className="subscription">
      <img src={subImage} className="sub-img" ></img>
      <div className="sub-text">
        <h1 className="sub-text1">
        <Typewriter
            options={{
              strings: ["Abonnez vous pour recevoir les dernieres actualites de darek"],
              autoStart: true,
              loop: true,
            }}
          />
          </h1>

        <h3 className="sub-text2">Rien ne vaudra jamais la satisfaction d'un client, heureux de
          <br/> l'expérience qu'il vient de vivre</h3>

        <div className="sub-email">
          <input className="email-input" type={"email"}></input>
          <button className="sub-submit">Abonner</button>
        </div>
      </div>
    </div>


  )
}
