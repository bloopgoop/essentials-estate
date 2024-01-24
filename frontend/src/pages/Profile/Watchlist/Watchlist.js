import React, { useState, useEffect } from "react";
import WatchlistCard from "../../../components/WatchlistCard/WatchlistCard";
import "./Watchlist.css";
import propertyService from "services/property/propertyAPI";
import Loading from "components/Loading";

export default function Watchlist() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState("recent");

  useEffect(() => {
    propertyService
      .getRange(0, 20) // Fetch initial data, assuming starting from index 0
      .then((response) => {
        if (response.status === 204) {
          return;
        }
        setProperties(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(`Error fetching properties: ${error}`);
      });
  }, []); // Empty dependency array ensures this effect runs only once

  const sortProperties = (option) => {
    switch (option) {
      case "recent":
        // No need to sort for "recent," use the original order
        break;
      case "low-high":
        setProperties(
          [...properties].sort((a, b) => Number(b.rent) - Number(a.rent))
        );
        break;
      case "high-low":
        setProperties(
          [...properties].sort((a, b) => Number(a.rent) - Number(b.rent))
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    sortProperties(option);
  }, [option]);

  return (
    <>
      <h1>Watchlist</h1>
      <div id="searchsort">
        <input type="text" placeholder="Search.." />
        <div id="sortitem">
          <label htmlFor="sort">Sort by: </label>
          <select
            name="sort"
            id="sort"
            value={option}
            onChange={(e) => setOption(e.target.value)}
          >
            <option value="recent">Recent</option>
            <option value="low-high">low-high</option>
            <option value="high-low">high-low</option>
          </select>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : properties.length > 0 ? (
        properties.map((property, key) => (
          <div key={key}>
            <WatchlistCard props={property} />
          </div>
        ))
      ) : (
        <p>No properties available.</p>
      )}
    </>
  );
}
