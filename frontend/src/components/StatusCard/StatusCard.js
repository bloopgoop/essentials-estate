import React from "react";
import "./StatusCard.css";
import image from "../../assets/couch.jpg";

function StatusCard(props) {
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
        <img src={image} height={250} className="Status--image" />
      </div>
      <div id="Status--info">
        <h2>Property Name</h2>
        <p>5 *****</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis est
          ipsum, vulputate ac tortor in, tempus ullamcorper est.
        </p>
        <p>New York, NY</p>

        <div class="stepper-wrapper">
          {currentStatus.map((stat, index) => (
            <div className={`stepper-item ${check[index]}`}>
              <div key={index} className="step-counter"></div>
              <div className="step-name">{stat}</div>
            </div>
          ))}
        </div>

        <button>See Property</button>
      </div>
    </div>
  );
}

export default StatusCard;
