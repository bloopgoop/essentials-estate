import { useRef, useState, useEffect } from "react";

import Navbar from "components/Navbar/Navbar";
import Footer from 'components/Footer/Footer';

import RecommendationCard from './RecommendationCard';
import SimilarItems from "./SimilarItems";
import LikedSection from "./LikedSection";

import propertyService from "services/property/testAPI";

import './Dashboard.css';


// Dashboard should show recommended property listings, liked properties, 
// Normally you'll have two components: ThingThatLoadsData and ChildThatShowsData.


export default function Root() {
  // state that holds the list of properties
  const [properties, setProperties] = useState([]);

  // call api on first render
  useEffect(() => {
    console.log("useEffect called");
    propertyService
      .getAll()
      .then((properties) => {
        setProperties(properties);
        console.log(properties);
      })
      .catch((error) => {
        alert(`Error fetching properties: ${error}`);
      });
  }, []);



  return (
    <>
      {properties.length > 0 && 
        <>
          <button >get more data</button>

          <div style={{ width: '100%', paddingLeft: '3rem', paddingRight: '3rem', minWidth: '60rem'}}>
            <Navbar />
            <RecommendationCard property={properties[Math.floor(Math.random() * 10)]} />
            {/* wrapper is background color change */}
            <div id="similar-items-wrapper">
              <SimilarItems properties={properties} />
            </div>
            <LikedSection properties={properties} />
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