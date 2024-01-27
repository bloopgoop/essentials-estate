import React, { useEffect, useState } from "react";
import "./Status.css";
import StatusCard from "../../../components/StatusCard/StatusCard";
import axios from "services/axiosConfigs";
import Loading from "components/Loading";
import ReactPaginate from "react-paginate";
import Profilemain from "../Main/Profilemain";

export default function Status() {
  const [properties, setProperties] = useState([]);
  const [propertiesStart, setPropertiesStart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    if (loading) {
      const request = axios.get(`property/reviewProperty/0`);
      request
        .then((response) => {
          setProperties(response.data);
          setPropertiesStart(response.data);
          setLoading(false);
        })
        .catch((error) => {
          alert(`Error fetching properties: ${error}`);
        });
    }
  }, [properties]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % 100;
    setItemOffset(newOffset);
  };

  const sortArray = (event) => {
    let filteredProperties = [];

    if (event === "all") {
      filteredProperties = propertiesStart;
    } else {
      filteredProperties = propertiesStart.filter((property) => {
        switch (event) {
          case "pending":
            return property.status === 0;
          case "approved":
            return property.status === 1;
          case "rejected":
            return property.status === 2;
          default:
            return true;
        }
      });
    }
    console.log(filteredProperties)
    setProperties(filteredProperties);
  };

  return (
    <>
      <Profilemain />
      <div id="profile--headers">
        <h1>Status</h1>
        <div id="profile--sort">
          <div id="searchsort">
            <div id="sortitem">
              <label htmlFor="sort">Sort by: </label>
              <select
                name="sort"
                id="sort"
                onChange={(event) => sortArray(event.target.value)}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
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
        <h1>No Properties Available</h1>
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
    </>
  );
}
