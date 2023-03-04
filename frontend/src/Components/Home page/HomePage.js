import React from "react";
import NavBarHome from "./NavBarHome";
import Search from "./Search/Search";
import { Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import Messages from "./messages/Messages";
import Profile from "./profile/Profile";
import Favorites from "./favorites/Favorites";
import Help from "./help/Help";
import ProfileIcon from "./ProfileIcon";
import OfferDetails from "./Offers/OfferDetails";
import CreateOffer from "./Offers/CreateOffer";
export default function HomePage() {
  return (
    <>
      <NavBarHome />
      <ProfileIcon />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/create-offer" element={<CreateOffer />} />
        <Route path="/:a_id" element={<OfferDetails />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Help />} />{" "}
      </Routes>
    </>
  );
}
