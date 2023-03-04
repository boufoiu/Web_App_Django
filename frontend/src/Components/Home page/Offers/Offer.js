import React, { useState, useEffect } from "react";
import "../../../styles/home page/offers/offer.css";
import offerImage from "../../../images/house.jpg";
import sellerImage from "../../../images/seller.png";
import { Link } from "react-router-dom";

import axios from "axios";

export default function (props) {
  const [offerProps, setOfferProps] = useState({});
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
  } = props.offer;
  const [seller, setSeller] = useState({});
  const [src, setSrc] = useState("");

  useEffect(() => {
    axios
      .get("/api/announcements/" + id + "/")
      .then((res) => setOfferProps(res.data))
      .catch((err) => console.log(err));
    axios
      .get("/api/announcements/" + id + "/get_thumb/")
      .then((res) => {
        const imageUrl = "data:image/jpg;base64, " + res.data;
        setSrc(imageUrl);
      })
      .catch((err) => console.log(err));

    // axios
    //   .get("/api/user/" + Owner + "/")
    //   .then((res) => setSeller(res.data))
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <div className="offer-container">
      <img
        // src={offerImage}
        src={src}
        className="offer-image"
      ></img>
      {/* <img src={seller.PfP} className="seller-image"></img> */}
      {/* <img src={sellerImage} className="seller-image"></img> */}

      <div className="offer-price">
        {" "}
        <span className="org-text">DA </span>
        {Price}
      </div>
      <div className="offer-title">{Title}</div>
      <div className="offer-description">
        {Description.substring(0, 70) + "..."}
      </div>
      <div className="offer-options">
        <div
          onClick={() => {
            axios
              .get("/session/", { withCredentials: true })
              .then(() => console.log("logged in"))
              .catch(() => (window.location = "/connect"));

            axios
              .post("/api/announcements/" + id + "/favourite/")
              .then((res) => (window.location = "/home/favorites"))
              .catch((err) => console.log(err));
          }}
        >
          <i className="fa-solid fa-heart"></i>
        </div>
        <div>
          <i className="fa-solid fa-comment-dots"></i>
        </div>
        <Link to={"/home/" + id}>
          <button>Details</button>
        </Link>
      </div>
    </div>
  );
}
