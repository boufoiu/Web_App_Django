import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import profileImage from "../../images/profile.jpg";
import "../../styles/home page/profileIcon.css";

export default function ProfileIcon() {
  const [user, setUser] = useState("");
  useEffect(() => {
    axios
      .get("/session/", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link to="/home/profile">
      <div className="profile-icon">
        {user.LastName} <img src={user.PfP} />
      </div>
    </Link>
  );
}
