import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import propertyService from "services/property/testAPI";
import axios from "services/axiosConfigs";
import "./PropertyReview.css";

function PropertyReview() {
  const [property, setProperty] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    propertyService
      .getOne(id)
      .then((response) => {
        setProperty(response);
      })
      .catch((error) => {
        alert(`Error fetching property: ${error}`);
        return <h1>404 property not found</h1>;
      });
  }, [id]);

   const accept = () => {
     onClick(1);
   };

   const reject = () => {
     onClick(2);
   };

   const onClick = (status) => {
     try {
       const formData = new FormData();
       formData.append("propertyID", id);
       formData.append("status", status);
       const request = axios.post("property/reviewProperty/", formData);
    //    request.then((response) => setProperties(response.data));
     } catch (error) {
       console.log(`ERROR: ${error}`);
     }
   };

  return (
    <div>
      {property ? (
        <>
          <div>Property Review</div>
          <div>
            {property.address} {property.city} Valid <input type="radio" />
          </div>
          <div>
            {property.lotsize} Valid <input type="radio" />
          </div>
          <div>
            {property.rent} Valid <input type="radio" />
          </div>
          <div>
            {property.sqft} Valid <input type="radio" />
          </div>
          <div>
            {property.type} Valid <input type="radio" />
          </div>
          <button onClick={accept}>Accept</button>
          <button onClick={reject}>Reject</button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default PropertyReview;
