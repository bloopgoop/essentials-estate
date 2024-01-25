import React, { useEffect, useState } from "react";
import "./Review.css";
import axios from "services/axiosConfigs";
import StatusCard from "../../components/StatusCard/StatusCard";
import Loading from "components/Loading";

function Review() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = axios.get(`property/reviewProperty`);
    request.then((response) => {
      setProperties(response.data);
      setLoading(false)
    });
  }, []);

  return (
    <>
      <h1>This is the Review Page :D</h1>
      {loading ? (
        <Loading />
      ) : properties.length > 0 ? (
        properties.map((property, key) => (
          <div key={key}>
            <StatusCard props={property} page="review" />
          </div>
        ))
      ) : (
        <p>No properties available.</p>
      )}
    </>
  );
}

export default Review;
