import { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer';
import RecommendationCard from '../../components/RecommendationCard/RecommendationCard';
import SimilarItems from "../../components/SimilarItems/SimilarItems";
import LikedSection from "../../components/LikedSection/LikedSection";

import './Dashboard.css';

import data from '../../property-data.json';


// Dashboard should show recommended property listings, liked properties, 

export default function Root() {
  // state that holds the list of properties
  const [properties, setProperties] = useState([]);


  // cache api call function between re-renders
  // FAKE API CALL
  const getProperties = () => {
    // fetch data from API, pass in properties so as to not get the same data
    const newlist = properties.concat(data);
    setProperties(newlist);
    console.log(properties);
  }


  // call api on first render
  useEffect(() => {
    console.log("useEffect called")
    getProperties();
  }, []);

  console.log(properties)


  return (
    <>
      <button onClick={getProperties}>get more data</button>
      <div style={{ width: '100%', paddingLeft: '3rem', paddingRight: '3rem', minWidth: '60rem'}}>
        <Navbar />


        <RecommendationCard property={data[Math.floor(Math.random() * 10)]} />

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
  );
}