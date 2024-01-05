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

  const accept = (propertyID) => {
    onClick(propertyID, 1)
  };

  const reject = (propertyID) => {
    onClick(propertyID, 2)
  };

  const onClick = (propertyID, status) => {
    try {
      console.log(`THIS IS THE PROPERTY ID: ${propertyID}`)
      console.log(`THIS IS THE STATUS: ${status}`);
      const formData = new FormData();
      formData.append("propertyID", propertyID);
      formData.append("status", status);
      const request = axios.post("property/reviewProperty/", formData);
      request.then((response) => setProperties(response.data));
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };

  return (
    <div>
      <h1>This is the Review Page :D</h1>
      {/* {console.log(properties)} */}
      {properties.map((property, key) => (
        <div key={key}>
          <StatusCard
            props={property}
            accept={() => accept(property.id)}
            reject={() => reject(property.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default Review;
