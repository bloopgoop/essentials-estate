import React, { useState, useEffect } from "react";
import propertyService from "services/property/testAPI";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "components/Navbar/Navbar";
import Gallery from "components/Gallery"
import "./Property.css";

const Property = () => {
  const [property, setProperty] = useState(null);
  const { id } = useParams();

  console.log(id);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    propertyService
      .getOne(id)
      .then((response) => {
        console.log(response);
        setProperty(response);
      })
      .catch((error) => {
        alert(`Error fetching property: ${error}`);
        return <h1>404 property not found</h1>;
      });
  }, []);

  return (
    <>
      <Navbar />
      {property ? (
        <div>

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
          <p>Stars: {property.stars}</p>
          {/* <img src={property.photos[0]} alt="Property" /> */}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Property;
