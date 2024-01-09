import React, { useState, useEffect, useContext } from "react";
import propertyService from "services/property/propertyAPI";
import { useParams } from "react-router-dom";
import Navbar from "components/Navbar/Navbar";
import Gallery from "components/Gallery";
import "./Property.css";
import axios from "services/axiosConfigs";
import AuthContext from "context/AuthContext";
import RentalButton from "./RentalButton";

const Property = () => {
  const auth = useContext(AuthContext);

  const [requestStatus, setRequestStatus] = useState(null); // ["pending", "accepted", "none"]
  const [property, setProperty] = useState(null);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [Ratings, setRatings] = useState([]);

  const [isOwner, setIsOwner] = useState(false);
  const { id } = useParams();

  console.log(id);

  let { user, logoutUser } = useContext(AuthContext);


  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const request = axios.get(`property/rating/${id}`);
    request.then((response) => setAvgRating(response.data.average_value));
    request.then((response) => setRatings(response.data.ratings.reverse()));

    propertyService
      .getOne(id)
      .then((response) => {
        setProperty(response);
        if (auth.user) {
          setIsOwner(response.ownerID === auth.user.user_id);
        }
        setRequestStatus(response.status);
        console.log(requestStatus);
      })
      .catch((error) => {
        alert(`Error fetching property: ${error}`);
        return <h1>404 property not found</h1>;
      });
  }, []);

  const handleGet = (event) => {
    event.preventDefault();
    const request = axios.get(`property/rating/${id}`);
    request.then((response) => setAvgRating(response.data.average_value));
    request.then((response) => setRatings(response.data.ratings.reverse()));
  };

  const handlePost = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("stars", stars);
    formData.append("propertyID", id);
    formData.append("comment", comment);
    formData.append("token", auth.authTokens.access);

    const request = axios.post(`property/rating/${id}`, formData);
    request
      .then((response) => {
        console.log("Success:", response.data);
        // Updates comments and rating every post
        handleGet(event);
      })
      .catch((error) => {
        console.error("Error making POST request:", error);
      });
  };

  // REMOVE LATER, FOR TESTING checkGroup
  const checkGroup = (event) => {
    try {
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("user_id", user.user_id);
      const request = axios.post("property/checkGroup/admin", formData);
      request.then((response) => console.log(response.data));
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };

  return (
    <>
      <Navbar />
      {property ? (
        <div>
          {requestStatus}
          <main id="main-content">
            <h1>{property.title}</h1>
            <div className="split-container">
              <p>
                Property type: {capitalize(property.type)} &nbsp;
                <strong>{`City: ${property.city}`}</strong>
              </p>
              <i>{property.stars}</i>
            </div>
            <Gallery photos={property.photos} />

            <div className="split-container">
              <p>{property.description}</p>
              <button>Rent</button>
            </div>
          </main>
          <h1>{property.title}</h1>
          <p>{property.description}</p>
          <p>Owner: {property.owner}</p>
          <p>
            Address: {property.address}, {property.city}, {property.state}{" "}
            {property.zip}
          </p>
          <p>Rent: ${property.rent}/month</p>
          <p>Bedrooms: {property.bedrooms}</p>
          <p>Bathrooms: {property.bathrooms}</p>
          <p>Garage: {property.garage} car(s)</p>
          <p>Square Footage: {property.sqft} sqft</p>
          <p>Lot Size: {property.lotsize} acres</p>
          <p>Type: {property.type}</p>
          <p>Stars: {Math.round(avgRating * 10) / 10}</p>
          {/* <p>Stars: {property.stars}</p> */}
          {/* <img src={property.photos[0]} alt="Property" /> */}
          
          {/* REMOVE LATER, FOR TESTING checkGroup */}
          <button onClick={checkGroup}>Are You An Admin?</button>
          <input
            type="number"
            min={0}
            max={5}
            onChange={(e) => setStars(e.target.value)}
          ></input>
          <textarea onChange={(e) => setComment(e.target.value)}></textarea>
          <button onClick={handlePost}>Post</button>
          <button onClick={handleGet}>Get</button>
          {Ratings.map((rating, key) => (
            <div key={key}>
              <p>
                {rating.stars}* {rating.comment}
              </p>
            </div>
          ))}
          <textarea></textarea>
          {/* <img src={property.photos[0]} alt="Property" /> */}

          {auth.user && !isOwner ? (
            <RentalButton propertyID={id} status={requestStatus} />
          ) : null}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Property;
