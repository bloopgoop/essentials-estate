import React, { useEffect, useState } from "react";
import propertyService from "services/property/propertyAPI";
import "./Review.css";
import axios from "services/axiosConfigs";
import StatusCard from "../../components/StatusCard/StatusCard";

function Review() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const request = axios.get(`property/reviewProperty`);
    request.then((response) => setProperties(response.data));
  }, []);

  return (
    <>
      <h1>This is the Review Page :D</h1>
      {properties.map((property, key) => (
        <div key={key}>
          <StatusCard props={property} page="review" />
        </div>
      ))}
    </>
  );
}

export default Review;
