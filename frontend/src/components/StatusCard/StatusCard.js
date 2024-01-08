import React from "react";
import "./StatusCard.css";
import image from "../../assets/couch.jpg";
import { Link } from "react-router-dom";

function StatusCard({ props, accept, reject, view }) {
  const status = [
    "Submiting",
    "In Review By Lease Agent",
    "In Review By Head Of Lease",
    "In Review By Country Manager",
    "Listing",
  ];
  const accepted = [
    "Submitted",
    "Approved By Lease Agent",
    "Approved By Head Of Lease",
    "Approved By Country Manager",
    "Listed",
  ];
  const check = ["", "", "", "", ""];
  const step = 2; // TEMPORARY VALUE TO TEST, REMOVE LATER AND MAKE IT INTO A PROP :D

  const currentStatus = status.slice(0, step).concat(accepted.slice(2));
  for (let i = 0; i < step; i++) {
    check[i] = "completed";
  }

  check[step] = "active";

  return (
    <div id="Status--container">
      <div>
        <img src={props.photos[0]} height={250} className="Status--image" />
      </div>
      <div id="Status--info">
        <h2>Property Name</h2>
        <p>5 *****</p>
        <p>{props.description}</p>
        <p>New York, NY</p>

        <div className="stepper-wrapper">
          {currentStatus.map((stat, index) => (
            <div key={index} className={`stepper-item ${check[index]}`}>
              <div className="step-counter"></div>
              <div className="step-name">{stat}</div>
            </div>
          ))}
        </div>
        {/* REMOVE EXTRA BUTTON AND MAKE IT VIEW */}
        {/* UNCOMMENT position: abosolute StatusCard.css */}
        {/* CREATE A NEW COMPONENT FOR REVIEW.JS */}
        <Link to={`/review/${props.id}`}><button>View Property</button></Link>
      </div>
    </div>
  );
}

export default StatusCard;