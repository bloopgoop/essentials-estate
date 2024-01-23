import React, { useEffect, useState } from "react";
import "./Status.css";
import StatusCard from "../../../components/StatusCard/StatusCard";
import axios from "services/axiosConfigs";

export default function Status() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const request = axios.get(`property/reviewProperty`);
    request.then((response) => setProperties(response.data));
  }, []);

  return (
    <div>
      <div id="StatusContainer">
        <h1>Status</h1>
        <div id="searchsort">
          <input type="text" placeholder="Search..." />
          <div id="sortitem">
            <label htmlFor="sort">Sort by: </label>
            <select name="sort" id="sort">
              <option value="A-Z">A-Z</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="denied">Denied</option>
            </select>
          </div>
        </div>
      </div>
      {properties.map((property, key) => (
        <div key={key}>
          <StatusCard props={property} page="property"/>
        </div>
      ))}
    </div>
  );
}
