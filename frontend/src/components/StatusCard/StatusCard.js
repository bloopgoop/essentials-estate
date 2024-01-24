import React from "react";
import "./StatusCard.css";
import { Link } from "react-router-dom";

function StatusCard({ props, page }) {
  if (!props) return <h1>Loading...</h1>;
  console.log(props);
  const status = [
    "Submiting",
    "In Review",
    "Listing",
  ];
  const accepted = [
    "Submitted",
    "Approved",
    "Listed",
  ];
  const check = ["", "", "", "", ""];
  const step = props.status + 1; // TEMPORARY VALUE TO TEST, REMOVE LATER AND MAKE IT INTO A PROP :D

  const currentStatus = accepted.slice(0, step).concat(status.slice(step));
  for (let i = 0; i < step; i++) {
    check[i] = "completed";
  }
  check[step] = "active";

  return (
    <>
      <div id="Status--container">
        <div>
          <img
            src={props.photos[0].photo}
            height={250}
            width={250}
            className="Status--image"
            alt="property-img"
          />
        </div>
        <div id="Status--info">
          <h2>{props.city}, {props.state}</h2>
          <p>{props.stars}*</p>
          <p>{props.description}</p>
          <div className="stepper-wrapper">
            {currentStatus.map((stat, index) => (
              <div key={index} className={`stepper-item ${check[index]}`}>
                <div className="step-counter"></div>
                <div className="step-name">{stat}</div>
              </div>
            ))}
          </div>
          <Link to={`/${page}/${props.id}`}>
            <button id="Status--info--button">View Property</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default StatusCard;
