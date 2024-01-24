import WatchlistCard from "../../../components/WatchlistCard/WatchlistCard";
import "./Watchlist.css";
import { useState, useEffect } from "react";
import propertyService from "services/property/propertyAPI";

export default function Watchlist() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    propertyService
      .getRange(properties.length, properties.length + 20)
      .then((response) => {
        if (response.status === 204) {
          return;
        }
        setProperties(properties.concat(response.data));
      })
      .catch((error) => {
        alert(`Error fetching properties: ${error}`);
      });
  }, [properties]);

  return (
    <>
      <h1>Watchlist</h1>
      <div id="searchsort">
        <input type="text" placeholder="Search.." />
        <div id="sortitem">
          <label htmlFor="sort">Sort by:</label>
          <select name="sort" id="sort">
            <option value="recent">Recent</option>
            <option value="A-Z">A-Z</option>
            <option value="low-high">low-high</option>
            <option value="high-low">high-low</option>
          </select>
        </div>
      </div>
      {properties &&
        properties.map((property, index) => (
          <div key={index}>
            <WatchlistCard props={property} />
          </div>
        ))}
    </>
  );
}
