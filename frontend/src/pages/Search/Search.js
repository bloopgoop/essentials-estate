import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import PreviewCard from "components/PreviewCard";
import Loading from "components/Loading";

import propertyService from "services/property/propertyAPI";

import "./Search.css";

function Search() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState([]);
  const [shownProperties, setShownProperties] = useState([]); // properties that are shown on the page
  const [hasMore, setHasMore] = useState(true);

  const fetchData = () => {
    if (properties.length >= 500) {
      setHasMore(false);
      return;
    }
    propertyService
      .getRange(properties.length, properties.length + 20)
      .then((response) => {

        if (response.status === 204) {
          // no more properties to fetch
          setHasMore(false);
          return;
        }

        setProperties(properties.concat(response.data));
      })
      .catch((error) => {
        alert(`Error fetching properties: ${error}`);
      });
  };

  // call api on first render
  useEffect(() => {
    fetchData();
  }, []);

  // change filter on filter change, sort properties by show matched properties first, then unmatched after
  useEffect(() => {
    if (searchTerm === "" || filter === "") {
      setShownProperties(properties);
      return;
    }
    let filteredProperties = [];
    let unmatchedProperties = [];
    for (let i = 0; i < properties.length; i++) {
      if (properties[i][filter].toLowerCase().includes(searchTerm.toLowerCase())) {
        filteredProperties.push(properties[i]);
      } else {
        unmatchedProperties.push(properties[i]);
      }
    }
    
    setShownProperties([...filteredProperties, ...unmatchedProperties]);
  }, [filter, searchTerm, properties]);

  return (
    <>
      <Navbar />
      <div id="search">

        <div id="filter">
          <div>
            <label htmlFor="searchTerm">Search Term: </label>
            <input
              id="searchTerm"
              type="text"
              placeholder={"Search by " + filter + "..."}
              onChange={(event) => setSearchTerm(event.target.value.toLowerCase())}
            />
          </div>

          <div id="filterTypeContainer">
            <label htmlFor="filterType">Filter by: </label>
            <select onChange={(event) => setFilter(event.target.value)} id="filterType">
              <option value="">None</option>
              <option value="address">Address</option>
              <option value="city">City</option>
              <option value="title">Title</option>
              <option value="description">Description</option>
              <option value="owner">Owner</option>
              <option value="type">Type</option>
            </select>
          </div>
        </div>

        <div>
          Sorting by: <span>  </span>
          <strong>
            {filter === "" ? "NONE" : filter.toUpperCase()}
          </strong>
        </div>

        <InfiniteScroll
          dataLength={properties.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<Loading/>}
          endMessage={
            <p style={{ textAlign: "center", margin:"auto", marginTop:"3rem" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid">
            {shownProperties.map((property, index) => (
              <div className="grid-item" key={index}>
                <PreviewCard property={property} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <Footer />
    </>
  );
}

export default Search;
