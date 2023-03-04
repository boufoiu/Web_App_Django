import React, { useState, useEffect } from "react";
import OffersVisualizer from "../Offers/OffersVisualizer";
import axios from "axios";

export default function Favorites() {
  const [favOffers, setFavOffers] = useState([]);
  useEffect(() => {
    axios
      .get("/session/", { withCredentials: true })
      .then(() => console.log("logged in"))
      .catch(() => (window.location = "/connect"));

    axios
      .get("/api/favourite/", { withCredentials: true })
      .then((res) => setFavOffers(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div key="foo">
      <OffersVisualizer
        offers={favOffers}
        place={"favorites"}
        title={"Vos offres favoris:"}
      />
    </div>
  );
}
