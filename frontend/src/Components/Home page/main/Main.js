import React, { useState, useEffect, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import OffersVisualizer from "../Offers/OffersVisualizer";
import Offer from "../Offers/Offer";
import Search from "../Search/Search";

import axios from "axios";

export default function Main() {
  const [latestOffers, setLatestOffers] = useState([]);
  useEffect(() => {
    axios
      .get("/api/announcements/")
      .then((res) => {
        setLatestOffers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <AnnContext.Provider value={{ latestOffers, setLatestOffers }}>
        <Search place="home" />
      </AnnContext.Provider>

      <OffersVisualizer
        offers={latestOffers}
        place={"home"}
        title={"Offres plus recentes:"}
      />
      <Link to="/home/create-offer">
        <div className="new-offer">
          <i className="fa-solid fa-plus"></i>
        </div>
      </Link>
    </div>
  );
}

export const AnnContext = createContext();
