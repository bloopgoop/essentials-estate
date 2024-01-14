import { useEffect, useState } from "react";
import AssetCard from "../../../components/AssetCard/AssetCard";
import "./Assets.css";
import propertyService from "services/property/propertyAPI";

export default function Assets() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    propertyService.getAll().then((properties) => {
      setProperties(properties);
      console.log(propertyService);
    });
  }, []);

  return (
    <>
      <h1>Assets</h1>
      <div id="searchsort">
        <input type="text" placeholder="Search.." />
        <div id="sortitem">
          <label for="sort">Sort by:</label>
          <select name="sort" id="sort">
            <option value="recent">Recent</option>
            <option value="A-Z">A-Z</option>
            <option value="low-high">low-high</option>
            <option value="high-low">high-low</option>
          </select>
        </div>
      </div>
      <div id="asset-container">
        <div className="asset-item">
          {properties.map((property, key) => (
            <div key={key}><AssetCard props={property}/></div>
          ))}
        </div>
      </div>
    </>
  );
}
