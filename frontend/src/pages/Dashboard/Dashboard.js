import { useRef, useState, useEffect } from "react";
import { getProperties } from "apis/property/testAPI";

import Navbar from "components/Navbar/Navbar";
import Footer from 'components/Footer/Footer';
import RecommendationCard from 'components/RecommendationCard/RecommendationCard';
import SimilarItems from "components/SimilarItems/SimilarItems";
import LikedSection from "components/LikedSection/LikedSection";
import data from 'property-data.json'

import './Dashboard.css';


// Dashboard should show recommended property listings, liked properties, 

export default function Root() {
  // state that holds the list of properties
  const [properties, setProperties] = useState([]);

  // FAKE API CALL
  async function propertyAPICall() {
    const response = await getProperties();
    setProperties(properties.concat(response));
    console.log(properties);
  }

  // call api on first render
  useEffect(() => {
    console.log("useEffect called");
    propertyAPICall();

  }, []);



  return (
    <>
      {properties.length > 0 && 
        <>
          <button onClick={propertyAPICall}>get more data</button>

          <div style={{ width: '100%', paddingLeft: '3rem', paddingRight: '3rem', minWidth: '60rem'}}>
            <Navbar />
            <RecommendationCard property={data[Math.floor(Math.random() * 10)]} />
            {/* wrapper is background color change */}
            <div id="similar-items-wrapper">
              <SimilarItems properties={data} />
            </div>
            <LikedSection properties={data} />
            <section id="search-section">
              <h3>
                Not what you're looking for? <a href="#">Click here</a> to view more properties.
              </h3>
              <button>Search</button>
            </section>

          </div>
          <Footer />
        </>
      }
    </>
  );
}