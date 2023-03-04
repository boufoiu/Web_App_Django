import React from "react";
import MyOffer from "./MyOffer";
import "../../../styles/home page/offers/offerVisualizer.css";

export default function MyOffersVisualizer(props) {
  const { offers, place, title } = props;
  return (
    <div className={"offers-visualizer-ctn-" + place}>
      <div className="offers-visualizer-title">{title}</div>
      <div className={"offers-visualizer"}>
        {offers.map((offer, index) => (
          <MyOffer key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
}
