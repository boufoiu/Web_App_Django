import React from 'react'
import landingImage1 from "../../images/landing-image-1.jpg"
import "../../styles/landing-page/start.css"
import CreateAccount from '../Forms/CreateAccount'
import Navbar from './Navbar'
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

export default function Welcome() {
  return (
    <div className="landing-page1">
    <Navbar/>  
      <div className="content">
        <div className="welcome-text">
          <div className="landing-text1">Le <span className="org-text">1er</span> site de <br/> l’immobilier en<br/> Algérie </div>
          <div className="landing-text2">
          <Typewriter
            options={{
              strings: ["Accordez plus de visibilité à vos annonces immobilières","Aidez les gens à trouver les meilleurs endroits"],
              autoStart: true,
              loop: true,
            }}
          /></div>
          <Link to = '/connect'><button className='start-button'>Commencer</button></Link>
          <ul className="stats">
            <li><span className="big-text"><span className="org-text">+</span> 2K</span> <br/> <span className="middle-text">Annonces</span></li>
            <li><span className="big-text"><span className="blue-text">+</span> 5K <br/></span> <span className="middle-text">Clients fideles</span></li>
            <li><span className="org-text big-text">58</span> <br/> <span className="middle-text">Wilaya</span></li>
          </ul>
        </div>
        <img src={landingImage1} className="main-image"></img>
      </div>
    </div>
  )
}
