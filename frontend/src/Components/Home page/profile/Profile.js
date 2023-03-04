import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MyOffersVisualizer from "../Offers/MyOffersVisualizer";
import profileImage from "../../../images/profile.jpg";
import "../../../styles/home page/profile/profile.css";
import Cookies from "universal-cookie";

import axios from "axios";

const cookies = new Cookies();

export default function Profile() {
  const [myOffers, setMyOffers] = useState([]);
  const [userInfos, setUserInfo] = useState({});
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      const res = await axios.get("/logout/", { withCredentials: true });
      window.location = "/connect";
    } catch (err) {
      setError(err);
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     const res = await axios.get("/login/", { withCredentials: true });
  //     window.location.href = res.data;
  //   } catch (err) {
  //     setError(err);
  //   }
  // };
  useEffect(() => {
    axios
      .get("/session/", { withCredentials: true })
      .then((res) => setUserInfo(res.data))
      .catch((err) => (window.location = "/connect"));
    axios
      .get("/api/announcements/me/")
      .then((res) => setMyOffers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="profile-ctn">
      <div className="profile-info">
        <div className="title">
          Profile
          {/* <i className="fa-solid fa-pen-to-square"></i> */}
        </div>
        <img src={userInfos.PfP}></img>
        <div>
          {/* <button onClick={handleLogin}>Login with Google</button>
          {error && <p>{error.message}</p>} */}
        </div>
        {/* {JSON.stringify(userInfos)} */}
        <div>
          {userInfos.FirstName} {userInfos.LastName}
        </div>
        <div>{userInfos.Email}</div>
        <div>{userInfos.PhoneNumber}</div>
        <button className="connect" onClick={handleLogout}>
          Logout
        </button>
        {error && <p>{error.message}</p>}
      </div>
      <MyOffersVisualizer
        offers={myOffers}
        place={"profile"}
        title={"Voici les annonces que vous avez partage"}
      />
      <Link to="/home/create-offer">
        <div className="new-offer">
          <i className="fa-solid fa-plus"></i>
        </div>
      </Link>
    </div>
  );
}
