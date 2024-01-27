import { useEffect, useState } from "react";
import AssetCard from "../../../components/AssetCard/AssetCard";
import "./Assets.css";
import Loading from "components/Loading";
import ReactPaginate from "react-paginate";
import axios from "services/axiosConfigs";

export default function Assets() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  
  const [sortOption, setSortOption] = useState("recent");

  const itemsPerPage = 5;

  useEffect(() => {
    const request = axios.get(`property/userProperty`);
    request
      .then((response) => {
        setProperties(response.data.properties);
        setLoading(false);
      })
      .catch((error) => {
        alert(`Error fetching properties: ${error}`);
      });
  }, []);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % 100;
    setItemOffset(newOffset);
  };

  const sortArray = () => {
    const newProperty = properties.sort((a, b) => a.rent - b.rent);
    setProperties(newProperty);
  };

  return (
    <>
      <h1>Assets</h1>
      <div id="searchsort">
        <input type="text" placeholder="Search.." />
        <div id="sortitem">
          <label htmlFor="sort">Sort by: </label>
          <select name="sort" id="sort">
            <option value="low-high">Low - High</option>
            <option value="high-low">High - Low</option>
          </select>
        </div>
      </div>
      <div id="asset-container">
        <div className="asset-item">
          {loading ? (
            <Loading />
          ) : properties.length > 0 ? (
            properties
              .slice(itemOffset, itemOffset + itemsPerPage)
              .map((property, key) => (
                <div key={key}>
                  <AssetCard props={property} />
                </div>
              ))
          ) : (
            <p>No properties available.</p>
          )}
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={itemsPerPage}
            pageCount={Math.ceil(properties.length / itemsPerPage)}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            activeClassName="active"
            pageLinkClassName="page-link"
            previousLinkClassName="prev-link"
            nextLinkClassName="next-link"
          />
        </div>
      </div>
    </>
  );
}
