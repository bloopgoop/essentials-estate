import React, { useState, useEffect } from "react";
import propertyService from "services/property/propertyAPI";
import "./styles.css";

const RentalButton = ({ propertyID }) => {
  // status = ["pending", "accepted", "none", "owner"]
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
        setRentalStatus(response.data.rental_status);
      })
      .catch((error) => {
        alert(`Error fetching rental status: ${error}`);
      });
  }, [propertyID]);

  return (
    <>
      {rentalStatus === "none" ? (
        <button onClick={requestRental}>Request Rental</button>
      ) : (
        <button disabled className="disabled">
          {rentalStatus.charAt(0).toUpperCase() + rentalStatus.slice(1)}
        </button>
      )}
    </>
  );
};

export default RentalButton;
