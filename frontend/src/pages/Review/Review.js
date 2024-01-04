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

  const onClick = (propertyID) => {
    try {
      console.log(propertyID);
      const formData = new FormData();
      formData.append("propertyID", propertyID);
      formData.append("status", 1);
      const request = axios.post("property/reviewProperty/", formData);
      request.then((response) => console.log(response.data));
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
          <StatusCard props={property} onClick={() => onClick(property.id)} />
        </div>
      ))}
    </div>
  );
}

export default Review;
