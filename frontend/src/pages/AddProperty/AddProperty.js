import React, { useState } from "react";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import "./AddProperty.css";
import propertyService from "services/property/testAPI";
import { useNavigate } from "react-router-dom";
import Dropbox from "components/Dropbox/Dropbox";

const AddProperty = () => {
  const navigate = useNavigate();
  const [owner, setOwner] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [rent, setRent] = useState(0);
  const [description, setDescription] = useState("");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [garages, setGarages] = useState(0);
  const [sqft, setSqft] = useState(0);
  const [lotsize, setLotsize] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [type, setType] = useState("");

  const handleFileChange = (event) => {
    setPhotos(event.target.files);
  };

  const handleSubmit = (event) => {
    // TODO: Add property to the backend or perform any other necessary actions
    event.preventDefault();

    const formData = new FormData();
    formData.append("owner", owner);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zip", zip);
    formData.append("rent", rent);
    formData.append("description", description);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("garages", garages);
    formData.append("sqft", sqft);
    formData.append("lotsize", lotsize);
    formData.append("type", type);
    for (let i = 0; i < photos.length; i++) {
      formData.append(`file${i}`, photos[i]);
    }

    propertyService
      .create(formData)
      .then((response) => {
        alert("Property added successfully");
        
        console.log(response);
        // redirect to add photos page with property id
        console.log(response.id);
        navigate("/add-photo", { props: response.id });
      })
      .catch((error) => {
        alert(`Error adding property: ${error}`);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="page-body">
        <h1>Add Property</h1>
        <form onSubmit={handleSubmit} id="property-form">
          <div>
            <label htmlFor="owner">Owner:</label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="zip">Zip:</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="rent">Rent:</label>
            <input
              type="number"
              id="rent"
              name="rent"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="bedrooms">Bedrooms:</label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="bathrooms">Bathrooms:</label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="garage">Garage:</label>
            <input
              type="number"
              id="garage"
              name="garage"
              value={garages}
              onChange={(e) => setGarages(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="sqft">Sqft:</label>
            <input
              type="number"
              id="sqft"
              name="sqft"
              value={sqft}
              onChange={(e) => setSqft(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="lotsize">Lot Size:</label>
            <input
              type="number"
              id="lotsize"
              name="lotsize"
              value={lotsize}
              onChange={(e) => setLotsize(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="photos">Photos:</label>
            <input
              type="file"
              id="photos"
              name="photos"
              multiple
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <label htmlFor="type">Type of property:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>

          <button type="button" onClick={handleSubmit}>
            Add Property
          </button>
        </form>
      </div>
      <Footer />

      <Dropbox id={77} />
    </div>
  );
};

export default AddProperty;
