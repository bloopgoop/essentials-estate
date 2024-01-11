import React, { useState, useEffect, useContext } from "react";
import propertyService from "services/property/propertyAPI";
import "./styles.css"

const RentalButton = ({ propertyID, status }) => {
  // status = ["pending", "accepted", "none"]
  const [rentalStatus, setRentalStatus] = useState("none");

  const requestRental = () => {
    propertyService
      .requestPropertyRental(propertyID)
      .then((response) => {
        console.log(response.message);
        setRentalStatus("pending");
      })
      .catch((error) => {
        alert(`Error sending rental request: ${error}`);
      });
  };

  useEffect(() => {
    propertyService
      .getPropertyRentalStatus(propertyID)
      .then((response) => {
        console.log(response)
        setRentalStatus(response.rental_status);
      })
      .catch((error) => {
        alert(`Error fetching rental status: ${error}`);
      });
  }, []);

  return (
    <>
      {rentalStatus === "none" ? (
        <button onClick={requestRental}>Request Rental</button>
      ) : (
        <button disabled className="disabled">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      )}
    </>
  );
};

export default RentalButton;
