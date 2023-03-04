import React, { useState, useEffect } from "react";
import "../../../styles/home page/offers/offerDetails.css";
import offerImage from "../../../images/offer-details.jpg";
import sellerImage from "../../../images/seller.png";
import { useParams } from "react-router-dom";

import axios from "axios";

export default function OfferDetails() {
  const { a_id } = useParams();
  const [offer, setOffer] = useState({});
  const [photos, setPhotos] = useState([]);
  const [seller, setSeller] = useState({});
  useEffect(() => {
    axios
      .get(`/api/announcements/${a_id}`)
      .then((res) => setOffer(res.data.data))
      .catch((err) => console.log(err));
    axios
      .get(`/api/announcements/${a_id}/get_all_img/`)
      .then((res) => setPhotos(res.data))
      .catch((err) => console.log(err));

    // axios
    //   .get(`/api/user/${Owner}`)
    //   .then((res) => setSeller(res.data))
    //   .catch((err) => console.log(err));
  }, []);
  const {
    id,
    PubDate,
    Title,
    Description,
    Price,
    Area,
    Type,
    Category,
    Wilaya,
    Commune,
    Adress,
    Owner,
  } = offer;
  return (
    <div className="offer-details-ctn">
      <div className="offer-time">
        {"PubDate:  " + PubDate}
        <div className="seller-contact">
          <img src={sellerImage}></img>
          {seller.PfP}
          <i className="fa-solid fa-message"></i>
          <i className="fa-solid fa-phone"></i>
        </div>
      </div>
      <div className="offer-details-btns">
        <div>{"Type: " + Type}</div>
        <div>{"Superficie: " + Area}</div>
        <div>{"Wilaya: " + Wilaya}</div>
        <div>{"Commune: " + Commune}</div>
        <div>{"Adress: " + Adress}</div>
      </div>
      <div className="title-ctn">
        <div className="title">{Title}</div>
        <div className="price">
          <span>DA </span>
          {Price}
        </div>
      </div>
      <p className="offer-description">{Description}</p>
      <div className="offer-images-ctn">
        {photos.map((image) => (
          <img
            src={`data:image/jpg;base64, ${image}`}
            className="offer-details-image"
          ></img>
        ))}
      </div>
      <div class="mapouter">
        <div class="gmap_canvas">
          <iframe
            width="600"
            height="500"
            id="gmap_canvas"
            src={
              "https://maps.google.com/maps?q=+" +
              Commune +
              "%20" +
              Wilaya +
              "&t=&z=13&ie=UTF8&iwloc=&output=embed"
            }
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
          <br />
        </div>
      </div>
    </div>
  );
}
