import Dropbox from "components/Dropbox/Dropbox";
import Footer from "components/Footer/Footer";
import Navbar from "components/Navbar/Navbar";
import Error from "pages/Error/Error";
import { useLocation } from "react-router-dom";
import "./AddPhotos.css";

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
