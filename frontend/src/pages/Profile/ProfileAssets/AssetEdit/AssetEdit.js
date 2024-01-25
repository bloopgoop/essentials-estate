import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import propertyService from "services/property/propertyAPI";
import axios from "services/axiosConfigs";
import "./AssetEdit.css";

function AssetEdit() {
  const [property, setProperty] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [rent, setRent] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [garage, setGarage] = useState("");
  const [sqft, setSqft] = useState("");
  const [lotsize, setLotsize] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const getProperty = useCallback(() => {
    propertyService
      .getOne(id)
      .then((response) => {
        setProperty(response.data);
        setAddress(response.data.address);
        setCity(response.data.city);
        setState(response.data.state);
        setZip(response.data.zip);
        setRent(response.data.rent);
        setBedrooms(response.data.bedrooms);
        setBathrooms(response.data.bathrooms);
        setGarage(response.data.garage);
        setSqft(response.data.sqft);
        setLotsize(response.data.lotsize);
        setType(response.data.type);
        setDescription(response.data.description);
      })
      .catch((error) => {
        alert(`Error fetching property: ${error}`);
        return <h1>404 property not found</h1>;
      });
  }, [id])

  useEffect(() => {
    getProperty();
  }, [id, getProperty]);

  const handlePut = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zip", zip);
    formData.append("rent", rent);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("garage", garage);
    formData.append("sqft", sqft);
    formData.append("lotsize", lotsize);
    formData.append("type", type);
    formData.append("description", description);
    const request = axios.put(`/property/${id}/`, formData);
    request
      .then((response) => {
        console.log("Success:", response.data);
        getProperty();
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  };

  const handleDelete = (event) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (confirmation) {
      alert("Property has been deleted");
      event.preventDefault();
      const request = axios.delete(`/property/${id}/`);
      request
        .then((response) => {
          console.log("Success:", response.data);
        })
        .catch((error) => {
          console.log("Error making DELETE request:", error);
        });
      navigate("/profile/assets");
    }
  };

  if (!property) return <h1>Loading...</h1>;
  return (
    <>
      <h1>EDIT ASSET</h1>
      <table>
        <tbody>
          <tr>
            <td>Owner:</td>
            <td>{property.owner}</td>
            <td></td>
          </tr>
          <tr>
            <td>Address:</td>
            <td>{property.address}</td>
            <td>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>City:</td>
            <td>{property.city}</td>
            <td>
              <input value={city} onChange={(e) => setCity(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>State:</td>
            <td>{property.state}</td>
            <td>
              <input value={state} onChange={(e) => setState(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>Zip:</td>
            <td>{property.zip}</td>
            <td>
              <input value={zip} onChange={(e) => setZip(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>Rent:</td>
            <td>${property.rent}/month</td>
            <td>
              <input value={rent} onChange={(e) => setRent(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>Bedrooms:</td>
            <td>{property.bedrooms}</td>
            <td>
              <input
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Bathrooms:</td>
            <td>{property.bathrooms}</td>
            <td>
              <input
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Garage:</td>
            <td>{property.garage}</td>
            <td>
              <input
                value={garage}
                onChange={(e) => setGarage(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Square Footage:</td>
            <td>{property.sqft} sqft</td>
            <td>
              <input value={sqft} onChange={(e) => setSqft(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>Lot Size:</td>
            <td>{property.lotsize} acres</td>
            <td>
              <input
                value={lotsize}
                onChange={(e) => setLotsize(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Type:</td>
            <td>{property.type}</td>
            <td>
              <input value={type} onChange={(e) => setType(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{property.description}</td>
            <td>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handlePut}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}

export default AssetEdit;
