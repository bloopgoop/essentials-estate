import React, { useEffect, useState } from "react";
import "./Status.css";
import StatusCard from "../../../components/StatusCard/StatusCard";
import axios from "services/axiosConfigs";
import Loading from "components/Loading";
import ReactPaginate from "react-paginate";

export default function Status() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const request = axios.get(`property/reviewProperty/0`);
    request.then((response) => setProperties(response.data));
    setLoading(false);
  }, []);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % 100;
    setItemOffset(newOffset);
  };

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
      {loading ? (
        <Loading />
      ) : properties.length > 0 ? (
        properties
          .slice(itemOffset, itemOffset + itemsPerPage)
          .map((property, key) => (
            <div key={key}>
              <StatusCard props={property} page="property" />
            </div>
          ))
      ) : (
        <Loading />
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
  );
}
