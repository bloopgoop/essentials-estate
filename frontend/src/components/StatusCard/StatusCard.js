import React from "react";
import "./StatusCard.css";
import { Link } from "react-router-dom";

function StatusCard({ props, page }) {
  if (!props) return <h1>Loading...</h1>;
  const status = ["Submiting", "In Review", "Listing"];
  const accepted = ["Submitted", "Approved", "Listed"];
  let check = ["", "", ""];
  let step = props.status + 1;
  let currentStatus;
  check[step] = "active";

  if (props.status === 2) {
    check = ["rejected", "rejected", "last-rejected"];
    currentStatus = ["Submitted", "Rejected", "Not Listed"];
  } else {
    if (step === 2) step = 3;
    currentStatus = accepted.slice(0, step).concat(status.slice(step));
    for (let i = 0; i < step; i++) {
      check[i] = "completed";
    }
  }
  console.log(props);
  console.log(currentStatus);

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
            style={{ objectFit: "cover" }}
          />
        </div>
        <div id="Status--info">
          <h2>
            {props.city}, {props.state}
          </h2>
          <p>{props.stars}*</p>
          <p>{props.description}</p>
          <div className="stepper-wrapper">
            {props.status === 2
              ? currentStatus.map((stat, index) => (
                  <div key={index} className={`stepper-item ${check[index]}`}>
                    <div className="step-counter"></div>
                    <div className="step-name">{stat}</div>
                  </div>
                ))
              : currentStatus.map((stat, index) => (
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
