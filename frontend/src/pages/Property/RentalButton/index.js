import React, { useState, useEffect } from "react";
import propertyService from "services/property/propertyAPI";
import "./styles.css";
import { Button } from "components/ui/button"
import { cn } from "lib/utils";

const RentalButton = ({ propertyID, className }) => {
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
        <Button className={className} onClick={requestRental}>Request Rental</Button>
      ) : (
        <Button disabled className={cn("disabled", className)}>
          {rentalStatus.charAt(0).toUpperCase() + rentalStatus.slice(1)}
        </Button>
      )}
    </>
  );
};

export default RentalButton;
