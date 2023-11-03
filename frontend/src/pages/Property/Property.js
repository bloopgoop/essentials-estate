import React, { useState, useEffect } from "react";
import propertyService from "services/property/testAPI";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "components/Navbar/Navbar";

const Property = () => {
  const [property, setProperty] = useState(null);
  const {id} = useParams();

  console.log(id);

  useEffect(() => {
    propertyService
      .getOne(id)
      .then((response) => {
        console.log(response);
        setProperty(response);
      })
      .catch((error) => {
        alert(`Error fetching property: ${error}`);
        return (
          <h1>404 property not found</h1>
        )
      });
  }, []);

  return (
    <>
      <Navbar />
      {property ? (
        <div>
          <button>
            <Link to={`/search`}>Back to Search</Link>
          </button>
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
          <img src={property.photos[0]} alt="Property" />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Property;
