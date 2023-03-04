import React from "react";
import Offer from "./Offer";
import "../../../styles/home page/offers/offerVisualizer.css";

export default function OffersVisualizer(props) {
  const { offers, place, title } = props;
  return (
    <div className={"offers-visualizer-ctn-" + place}>
      <div className="offers-visualizer-title">{title}</div>
      <div className={"offers-visualizer"}>
        {offers.map((offer, index) => (
          <Offer key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
}
