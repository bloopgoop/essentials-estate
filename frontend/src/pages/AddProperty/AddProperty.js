import React, { useState, useContext } from "react";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import "./AddProperty.css";
import propertyService from "services/property/propertyAPI";
import { useNavigate } from "react-router-dom";
import AuthContext from "context/AuthContext";

const AddProperty = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",  
    zip: "",
    title: "",
    rent: 0,
    description: "",
    bedrooms: 0,
    bathrooms: 0,
    garages: 0,
    sqft: 0,
    lotsize: 0,
    type: "",
  });

  const handleSubmit = (event) => {
    // TODO: Add property to the backend or perform any other necessary actions
    event.preventDefault();

    const formData = new FormData();
    formData.append("address", form.address);
    formData.append("city", form.city);
    formData.append("state", form.state);
    formData.append("zip", form.zip);
    formData.append("title", form.title);
    formData.append("rent", form.rent);
    formData.append("description", form.description);
    formData.append("bedrooms", form.bedrooms);
    formData.append("bathrooms", form.bathrooms);
    formData.append("garages", form.garages);
    formData.append("sqft", form.sqft);
    formData.append("lotsize", form.lotsize);
    formData.append("type", form.type);
    formData.append("status", 0);
    formData.append("token", auth.authTokens.access); // JWT token
    propertyService
      .create(formData)
      .then((response) => {
        alert("Property added successfully");

        console.log(response);
        // redirect to add photos page with property id
        console.log(response.id);
        navigate("/add-photo", { state: { id: response.id } });
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
        <div>
            You will be registered as the owner of this property.
        </div>
        <form onSubmit={handleSubmit} id="property-form">

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={(e) => setForm({...form, address: e.target.value})}
            />

            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={form.city}
              onChange={(e) => setForm({...form, city: e.target.value})}
            />

            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={form.state}
              onChange={(e) => setForm({...form, state: e.target.value})}
            />

            <label htmlFor="zip">Zip:</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={form.zip}
              onChange={(e) => setForm({...form, zip: e.target.value})}
            />

            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={(e) => setForm({...form, title: e.target.value})}
            />

            <label htmlFor="rent">Rent:</label>
            <input
              type="number"
              id="rent"
              name="rent"
              value={form.rent}
              onChange={(e) => setForm({...form, rent: e.target.value})}
            />

            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
            />

            <label htmlFor="bedrooms">Bedrooms:</label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={form.bedrooms}
              onChange={(e) => setForm({...form, bedrooms: e.target.value})}
            />

            <label htmlFor="bathrooms">Bathrooms:</label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={form.bathrooms}
              onChange={(e) => setForm({...form, bathrooms: e.target.value})}
            />

            <label htmlFor="garage">Garage:</label>
            <input
              type="number"
              id="garage"
              name="garage"
              value={form.garages}
              onChange={(e) => setForm({...form, garages: e.target.value})}
            />

            <label htmlFor="sqft">Sqft:</label>
            <input
              type="number"
              id="sqft"
              name="sqft"
              value={form.sqft}
              onChange={(e) => setForm({...form, sqft: e.target.value})}
            />

            <label htmlFor="lotsize">Lot Size:</label>
            <input
              type="number"
              id="lotsize"
              name="lotsize"
              value={form.lotsize}
              onChange={(e) => setForm({...form, lotsize: e.target.value})}
            />

            <label htmlFor="type">Type of property:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={form.type}
              onChange={(e) => setForm({...form, type: e.target.value})}
            />
        </form>
        <button type="button" onClick={handleSubmit} id="add-property-btn">
            Add Property
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default AddProperty;
