import React from "react";
import { useState, createContext, useContext } from "react";
import "../../../styles/Search/SearchBar.css";
import axios from "axios";

import { RechContext } from "./Search";
import { AnnContext } from "../main/Main";

export default function SearchBar(props) {
  const { rech, setRech } = React.useContext(RechContext);
  const { latestOffers, setLatestOffers } = React.useContext(AnnContext);

  const handleSearch = async () => {
    const params = new URLSearchParams();

    if (rech.search) params.append("Recherche", rech.search);
    if (rech.Category) params.append("Category", rech.Category);
    if (rech.Wilaya) params.append("Wilaya", rech.Wilaya);
    if (rech.Commune) params.append("Commune", rech.Commune);
    if (rech.Type) params.append("Type", rech.Type);
    console.log("/api/announcements/?" + params.toString());
    axios
      .get("/api/announcements/?" + params.toString())
      .then((res) => {
        setLatestOffers(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={"search-bar-" + props.place}>
      <input
        value={rech.search}
        type={"text"}
        className="search-input"
        placeholder="Rechercher un bien, une adresse.."
        onChange={(event) => setRech({ ...rech, search: event.target.value })}
      />
      <button className="search-bar-button" onClick={handleSearch}>
        Rechercher
      </button>
      <button className="filter-check-button">
        <label for="filter-check">
          <i className="fa-solid fa-filter"></i>
        </label>
      </button>
    </div>
  );
}
