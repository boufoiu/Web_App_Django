import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/home page/offers/createOffer.css";

export default function CreateOffer() {
  const [obj, setObj] = useState({
    Title: "",
    Description: "",
    Price: 0,
    Area: 0,
    Type: "",
    Category: 0,
    Wilaya: "",
    Commune: "",
    Adress: "",
    Images: [],
  });
  useEffect(() => {
    axios
      .get("/session/", { withCredentials: true })
      .then(() => console.log("logged in"))
      .catch(() => (window.location = "/connect"));
  }, []);
  return (
    <div className="create-offer-form">
      <div className="title">Ajouter une annonce</div>
      <div className="input-ctn">
        <input
          id="title"
          className="input-full"
          type="text"
          placeholder="Titre"
          value={obj.Title}
          onChange={(event) => setObj({ ...obj, Title: event.target.value })}
        />
        <input
          id="description"
          className="input-full"
          type="text"
          placeholder="Description"
          value={obj.Description}
          onChange={(event) =>
            setObj({ ...obj, Description: event.target.value })
          }
        />
      </div>
      <div className="input-ctn">
        <div className="input-full">Prix:</div>
        <input
          id="price"
          className="input-full"
          type="number"
          placeholder="Prix"
          value={obj.Price}
          onChange={(event) => setObj({ ...obj, Price: event.target.value })}
        />
        <input
          id="wilaya"
          className="input-full"
          type="text"
          placeholder="Wilaya"
          value={obj.Wilaya}
          onChange={(event) => setObj({ ...obj, Wilaya: event.target.value })}
        />
        <input
          id="commune"
          className="input-full"
          type="text"
          placeholder="Commune"
          value={obj.Commune}
          onChange={(event) => setObj({ ...obj, Commune: event.target.value })}
        />
      </div>
      <select
        id="category"
        className="input-full"
        value={obj.Category}
        onChange={(event) => setObj({ ...obj, Category: event.target.value })}
      >
        <option value={1}>Vente</option>
        <option value={2}>Echange</option>
        <option value={3}>Location</option>
        <option value={4}>Location Vacance</option>
      </select>
      <input
        id="address"
        className="input-full-2"
        type="text"
        placeholder="L'adresse du bien"
        value={obj.Adress}
        onChange={(event) => setObj({ ...obj, Adress: event.target.value })}
      ></input>
      <div className="input-ctn">
        <input
          id="type"
          type="text"
          className="input-full"
          placeholder="Type du bien: Villa, Terrain..."
          value={obj.Type}
          onChange={(event) => setObj({ ...obj, Type: event.target.value })}
        />
        <div className="input-half">Area:</div>

        <input
          id="area"
          className="input-half"
          type="number"
          placeholder="Surface habitable en m²"
          value={obj.Area}
          onChange={(event) => setObj({ ...obj, Area: event.target.value })}
        ></input>
      </div>
      <div className="input-full">
        <div className="">Photos:</div>
        <input
          type="file"
          className="input-full"
          id="files"
          accept="image/png, image/jpg, image/jpeg"
          multiple
          onChange={(event) => {
            setObj({ ...obj, Images: event.target.files });
          }}
        />
      </div>
      <div>
        <button
          className="start-button-2"
          onClick={() => {
            const { Images, ...Json } = obj;
            const formData = new FormData();
            for (let i = 0; i < Images.length; i++) {
              formData.append("image", Images[i]);
            }
            formData.append("data", JSON.stringify(Json));

            axios
              .post("/api/announcements/", formData, {
                headers: {
                  "Content-Type": "multipart/formdata",
                },
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
            window.location = "/home/profile";
          }}
        >
          Publier l'annonce
        </button>
      </div>
    </div>
  );
}
