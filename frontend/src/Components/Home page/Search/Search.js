import React, { useState, createContext, useContext } from "react";
import "../../../styles/Search/Search.css";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

export const RechContext = createContext();

export default function Search(props) {
  const [rech, setRech] = useState({
    search: "",
    Category: "",
    Wilaya: "",
    Commune: "",
    Type: "",
  });
  return (
    <>
      <div className={"search-ctn-" + props.place}>
        <RechContext.Provider value={{ rech, setRech }}>
          <SearchBar place={props.place} />
          <FilterBar place={props.place} />
        </RechContext.Provider>
      </div>
      <Outlet />
    </>
  );
}
