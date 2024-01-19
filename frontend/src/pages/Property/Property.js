import React, { useState, useEffect, useContext } from "react";
import propertyService from "services/property/propertyAPI";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "components/Navbar/Navbar";
import Gallery from "components/Gallery";
import "./Property.css";
import axios from "services/axiosConfigs";
import AuthContext from "context/AuthContext";
import RentalButton from "./RentalButton";
import Footer from "components/Footer/Footer";
import Loading from "components/Loading";
import star from "assets/star.svg";

const Property = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useContext(AuthContext);

  const [property, setProperty] = useState(null);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    // Get ratings and average rating
    // catch any errors and redirect to error page
    const request = axios.get(`property/rating/${id}`);
    request.then((response) => setAvgRating(response.data.average_value));
    request.then((response) => setRatings(response.data.ratings.reverse()));

    // Get property info on load, changes after every update to property id or auth.user
    propertyService
      .getOne(id)
      .then((response) => {
        setProperty(response.data);
        if (auth.user) {
          setIsOwner(response.data.ownerID === auth.user.user_id);
        }
      })
      .catch((error) => {
        console.error("Error making GET request:", error);
        navigate("/error");
      });
  }, [id, auth.user, navigate]);

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
          <main id="main-content">
            {property.title ? (
              <h1>{property.title}</h1>
            ) : (
              <h1>{property.address + " " + property.zip}</h1>
            )}
            <div className="split-container">
              <p>
                Property type: {capitalize(property.type)} &nbsp;
                <strong>{`City: ${property.city}`}</strong>
              </p>

              <i>
              <img
                src={star}
                alt="star"
                style={{
                  height: "1rem",
                  width: "1rem",
                  marginRight: "0.25rem",
                }}
              />
              {property.stars}
              </i>
            </div>
            <Gallery photos={property.photos} />

            <div className="split-container">
              <p>Owner: {property.owner}</p>
              {auth.user && !isOwner ? <RentalButton propertyID={id} /> : null}
            </div>
            <p>{property.description}</p>

            <table>
              <tbody>
                <tr>
                  <td>Owner:</td>
                  <td>{property.owner}</td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>
                    {property.address}, {property.city}, {property.state}{" "}
                    {property.zip}
                  </td>
                </tr>
                <tr>
                  <td>Rent:</td>
                  <td>${property.rent}/month</td>
                </tr>
                <tr>
                  <td>Bedrooms:</td>
                  <td>{property.bedrooms}</td>
                </tr>
                <tr>
                  <td>Bathrooms:</td>
                  <td>{property.bathrooms}</td>
                </tr>
                <tr>
                  <td>Garage:</td>
                  <td>{property.garage} car(s)</td>
                </tr>
                <tr>
                  <td>Square Footage:</td>
                  <td>{property.sqft} sqft</td>
                </tr>
                <tr>
                  <td>Lot Size:</td>
                  <td>{property.lotsize} acres</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>{property.type}</td>
                </tr>
                <tr>
                  <td>Stars:</td>
                  <td>{Math.round(ratings * 10) / 10}</td>
                </tr>
              </tbody>
            </table>

            {/* REMOVE LATER, FOR TESTING checkGroup */}
            <button onClick={checkGroup}>Are You An Admin?</button>
            <input
              type="number"
              min={0}
              max={5}
              onChange={(e) => setStars(e.target.value)}
            ></input>
            <textarea onChange={(e) => setComment(e.target.value)}></textarea>
            <button onClick={handleGet}>Get</button>
            <button onClick={handlePost}>Post</button>
            <textarea></textarea>
            {/* <img src={property.photos[0]} alt="Property" /> */}
            <label htmlFor="rating">Avg rating:</label>
            <div id="rating">{avgRating}</div>
          </main>
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Property;
