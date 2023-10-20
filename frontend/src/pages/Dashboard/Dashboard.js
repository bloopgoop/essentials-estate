import { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer';
import './Dashboard.css';
import img1 from '../../assets/couch.jpg';
import img2 from '../../assets/whitecouch.jpg';


// Dashboard should show recommended property listings, recent activities,
// watching properties, ratings

export default function Root() {
    const gallery = useRef();

    return (
      <>
        <div style={{ width: '100%', paddingLeft: '2rem', paddingRight: '3rem', minWidth: '60rem'}}>
          <Navbar />


          <label htmlFor="recommendation-card">
            <p>Property type: house   <strong>Location: New York</strong></p>
          </label>
          <section id="recommendation-card">
            <div className="dir-btn dir-left">&lt;</div>
            <div className="dir-btn dir-right">&gt;</div>

            <div ref={gallery} id="gallery">
              <ul>
                <li><img src={img1} alt="img1" /></li>
                <li><img src={img2} alt="img2" /></li>
              </ul>
            </div>

            <div className="main-image">
              <img src={img1} alt="img3" />
            </div>

            <div className="card-info">
              <h1>Property Name</h1>
              <i>stars</i>
              <p>
                Property description lorem ipsum blah blah
                Property description lorem ipsum blah blah  
              </p>
              <button>Rent</button>
            </div>
          </section>


          <label htmlFor="recommendation-card">sdf</label>



        </div>
        <Footer />
      </>
    );
  }