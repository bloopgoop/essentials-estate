import { useEffect, useState } from "react";
import AssetCard from "../../../components/AssetCard/AssetCard";
import "./Assets.css";
import propertyService from "services/property/propertyAPI";
import Loading from "components/Loading";

export default function Assets() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    propertyService
      .getRange(properties.length, properties.length + 20)
      .then((response) => {
        if (response.status === 204) {
          return;
        }
        setProperties(properties.concat(response.data));
        setLoading(false)
      })
      .catch((error) => {
        alert(`Error fetching properties: ${error}`);
      });
  }, [properties]);

  return (
    <>
      <h1>Assets</h1>
      <div id="searchsort">
        <input type="text" placeholder="Search.." />
        <div id="sortitem">
          <label htmlFor="sort">Sort by: </label>
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
          {loading ? (
            <Loading />
          ) : properties.length > 0 ? (
            properties.map((property, key) => (
              <div key={key}>
                <AssetCard props={property} />
              </div>
            ))
          ) : (
            <p>No properties available.</p>
          )}
        </div>
      </div>
    </>
  );
}
