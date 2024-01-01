import React from "react";
import Navbar from "components/Navbar/Navbar";
import Dropbox from "components/Dropbox/Dropbox";
import Footer from "components/Footer/Footer";
import "./AddPhotos.css";
import { useLocation } from "react-router-dom";
import Error from "pages/Error/Error";

function AddPhotos() {
  // useLocation gets the data passed from the previous page
  const { state } = useLocation();
  if (!state) {
    return <Error props={{ error: "Missing ID", code: 498 }} />;
  }
  const property_id = state.id;

  return (
    <>
      <Navbar />
      <div id="add-photos">
        <h1>Add Photos</h1>
        <Dropbox id={property_id} />
      </div>
      <Footer />
    </>
  );
}

export default AddPhotos;
