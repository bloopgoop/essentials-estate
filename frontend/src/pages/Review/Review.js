import React, { useEffect, useState } from "react";
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
    <div>
      <h1>This is the Review Page :D</h1>
      {console.log(properties)}
      {properties.map((property, key) => (
        <div key={key}>
          <StatusCard props={property} />
        </div>
      ))}
    </div>
  );
}

export default Review;
