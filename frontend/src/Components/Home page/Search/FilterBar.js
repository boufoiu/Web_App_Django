import React from "react";
import "../../../styles/Search/FilterBar.css";

import { RechContext } from "./Search";

export default function FilterBar(props) {
  const { rech, setRech } = React.useContext(RechContext);
  const categs = [
    "Catégorie",
    "Vente",
    "Echange",
    "Location",
    "Location Vacance",
  ];
  return (
    <>
      <input type={"checkbox"} id="filter-check" />
      <div className={"filter-bar-" + props.place}>
        <div className="filter-div">
          <select
            onChange={(e) => {
              console.log(
                categs.findIndex((categ) => categ === e.target.value) - 1
              );
              if (e.target.value == "Catégorie") {
                setRech({
                  ...rech,
                  Category: "",
                });
              } else {
                setRech({
                  ...rech,
                  Category:
                    "" +
                    (categs.findIndex((categ) => categ === e.target.value) - 1),
                });
              }
            }}
            className="sign-in-input"
          >
            {categs.map((categ) => (
              <option className="filter-option" key={categ} value={categ}>
                {categ}
              </option>
            ))}
          </select>
          <input
            id="wilaya"
            className="sign-in-input"
            type="text"
            placeholder="Wilaya"
            value={rech.Wilaya}
            onChange={(event) =>
              setRech({ ...rech, Wilaya: event.target.value })
            }
          />
          <input
            id="commune"
            className="sign-in-input"
            type="text"
            placeholder="Commune"
            value={rech.Commune}
            onChange={(event) =>
              setRech({ ...rech, Commune: event.target.value })
            }
          />
          <input
            id="type"
            className="sign-in-input"
            type="text"
            placeholder="Type"
            value={rech.Type}
            onChange={(event) => setRech({ ...rech, Type: event.target.value })}
          />
        </div>
        {/* <div className="search-button">Appliquer</div> */}
      </div>
    </>
  );
}
