import React, { useEffect, useState } from "react";
import "./Review.css";
import axios from "services/axiosConfigs";
import StatusCard from "../../components/StatusCard/StatusCard";
import Loading from "components/Loading";

function Review() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = axios.get(`property/reviewProperty/1`);
    request.then((response) => {
      setProperties(response.data);
      setLoading(false)
    });
  }, []);

  return (
    <>
      <h3 id="Review--Header">Admin Review Page</h3>
      <div id="Review--Wrapper">
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
      </div>
      <div id="Review--Spacer"></div>
    </>
  );
}

export default Review;
