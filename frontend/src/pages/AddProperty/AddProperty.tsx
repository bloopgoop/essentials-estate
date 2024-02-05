import Footer from "components/Footer/Footer";
import Navbar from "components/Navbar/Navbar";
import AuthContext from "context/AuthContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import propertyService from "services/property/propertyAPI";
import "./AddProperty.css";

const AddProperty = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    owner: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    title: "",
    rent: 0,
    description: "",
    bedrooms: 0,
    bathrooms: 0,
    garage: 0,
    sqft: 0,
    lotsize: 0,
    type: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      formData.append(key, value.toString());
    }

    if (auth.authTokens === null) {
      alert("You must be logged in to add a property");
      return;
    }
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

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <Navbar />
      <div className="page-body">
        <h1>Add Property</h1>
        <div>You will be registered as the owner of this property.</div>
        <form onSubmit={handleSubmit} id="property-form">
          {Object.entries(form).map(([formKey, formValue], index) => {
            let keyAsString = formKey.toString();
            return (
              <>
                <label htmlFor={keyAsString} >
                  {keyAsString.charAt(0).toUpperCase() + keyAsString.slice(1)}:
                </label>
                {typeof formValue === "number" ? (
                  <input
                    type="number"
                    id={keyAsString}
                    name={keyAsString}
                    value={formValue}
                    onChange={handleFormChange}
                  />
                ) : (
                  <input
                    type="text"
                    id={keyAsString}
                    name={keyAsString}
                    value={formValue}
                    onChange={handleFormChange}
                  />
                )}
              </>
            );
          })}
          <div></div>
          <button type="submit" id="add-property-btn">Add Property</button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
