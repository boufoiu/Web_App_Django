import React from "react";
import About from "./About";
import Contact from "./Contact";
import Share from "./Share";
import Subscription from "./Subscription";
import Welcome from "./Welcome";
import "../../styles/landing-page/responsive.css";
import Search from "../Home page/Search/Search";

export default function LandingPage() {
  return (
    <>
      <Welcome />
      <Share />
      <Subscription />
      <Contact />
      <About />
    </>
  );
}
