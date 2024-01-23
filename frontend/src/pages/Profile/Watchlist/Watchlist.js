import WatchlistCard from "../../../components/WatchlistCard/WatchlistCard";
import "./Watchlist.css";
import { useState, useEffect } from "react";
import propertyService from "services/property/propertyAPI";

export default function Watchlist() {
  const [properties, setProperties] = useState([]);
  const [recent, setRecent] = useState([]);
  const [option, setOption] = useState("recent");
  useEffect(() => {
    propertyService
      .getRange(properties.length, properties.length + 20)
      .then((response) => {
        if (response.status === 204) {
          return;
        }
        setProperties(properties.concat(response.data));
        setRecent(properties.concat(response.data));
      })
      .catch((error) => {
        alert(`Error fetching properties: ${error}`);
      });
  }, []);

  // setSort is not working properly, fix 
  const setSort = () => {
    let sorted = properties;
    switch (option) {
      case "recent":
        sorted = recent
        break;
      case "low-high":
        sorted.sort((a, b) => Number(b.rent) - Number(a.rent));
        break;
      case "high-low":
        sorted.sort((a, b) => Number(a.rent) - Number(b.rent));
        break;
    }
    setProperties(sorted);
  };

  useEffect(() => {
    setSort();
  }, [option, properties]);
  //

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
            onChange={(e) => setOption(e.target.value)}
          >
            <option value="recent">Recent</option>
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
