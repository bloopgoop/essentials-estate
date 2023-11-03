import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import PreviewCard from "components/PreviewCard";

import propertyService from "services/property/testAPI";

import "./Search.css";

function Search() {
  // state that holds the list of properties
  const [properties, setProperties] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = () => {
    if (properties.length >= 200) {
      setHasMore(false);
      return;
    }
    propertyService
      .getAll()
      .then((response) => {
        setProperties(properties.concat(response));
      })
      .catch((error) => {
        alert(`Error fetching properties: ${error}`);
      });
  }

  // call api on first render
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div id="search">
        <Navbar />
        <InfiniteScroll
          dataLength={properties.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid">
            {properties.map((property, index) => (
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
