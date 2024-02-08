import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "services/axiosConfigs";
import propertyService from "services/property/propertyAPI";
import "./AssetEdit.css";
import { Property } from "types/property";

interface editPropertyForm {
  address: string;
  city: string;
  state: string;
  zip: string;
  rent: string;
  bedrooms: string;
  bathrooms: string;
  garage: string;
  sqft: string;
  lotsize: string;
  type: string;
  description: string;
}

function AssetEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState<editPropertyForm>({
    address: "",
    city: "",
    state: "",
    zip: "",
    rent: "",
    bedrooms: "",
    bathrooms: "",
    garage: "",
    sqft: "",
    lotsize: "",
    type: "",
    description: "",
  });

  const getProperty = useCallback(() => {
    propertyService
      .getOne(id)
      .then((response) => {
        // populate form on load
        setProperty(response.data);
        setFormData({
          address: response.data.address,
          city: response.data.city,
          state: response.data.state,
          zip: response.data.zip,
          rent: response.data.rent,
          bedrooms: response.data.bedrooms,
          bathrooms: response.data.bathrooms,
          garage: response.data.garage,
          sqft: response.data.sqft,
          lotsize: response.data.lotsize,
          type: response.data.type,
          description: response.data.description,
        });
      })
      .catch((error) => {
        alert(`Error fetching property: ${error}`);
        return <h1>404 property not found</h1>;
      });
  }, [id]);

  useEffect(() => {
    getProperty();
  }, [id, getProperty]);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    console.log(event.target.name);
    console.log(event.target.value);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handlePut = (event: React.MouseEvent) => {
    event.preventDefault();
    const form = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      form.append(key, value.toString());
    }
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

  const handleDelete = (event: React.MouseEvent) => {
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
      <div id="editAssets--wrapper">
        <h1>Edit Asset</h1>
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
                  value={formData.address}
                  name="address"
                  onChange={handleFormChange}
                />
              </td>
            </tr>
            <tr>
              <td>City:</td>
              <td>{property.city}</td>
              <td>
                <input
                  value={formData.city}
                  name="city"
                  onChange={handleFormChange}
                />
              </td>
            </tr>
            <tr>
              <td>State:</td>
              <td>{property.state}</td>
              <td>
                <input
                  value={formData.state}
                  name="state"
                  onChange={handleFormChange}
                />
              </td>
            </tr>
            <tr>
              <td>Zip:</td>
              <td>{property.zip}</td>
              <td>
                <input
                  value={formData.zip}
                  name="zip"
                  onChange={handleFormChange}
                />
              </td>
            </tr>
            <tr>
              <td>Rent:</td>
              <td>${property.rent}/month</td>
              <td>
                <input
                  type="number"
                  value={formData.rent}
                  name="rent"
                  onChange={handleFormChange}
                />
              </td>
            </tr>
            <tr>
              <td>Bedrooms:</td>
              <td>{property.bedrooms}</td>
              <td>
                <input
                  type="number"
                  value={formData.bedrooms}
                  name="bedrooms"
                  onChange={handleFormChange}
                />
              </td>
            </tr>
            <tr>
              <td>Bathrooms:</td>
              <td>{property.bathrooms}</td>
              <td>
                <input
                  type="number"
                  value={formData.bathrooms}
                  name="bathrooms"
                  onChange={handleFormChange}
                />
              </td>
            </tr>
            <tr>
              <td>Garage:</td>
              <td>{property.garage}</td>
              <td>
                <input
                  type="number"
                  value={formData.garage}
                  name="garage"
                  onChange={handleFormChange}
                />
              </td>
            </tr>
            <tr>
              <td>Square Footage:</td>
              <td>{property.sqft} sqft</td>
              <td>
                <input
                  value={formData.sqft}
                  type="number"
                  name="sqft"
                  onChange={handleFormChange}
                />
              </td>
            </tr>
            <tr>
              <td>Lot Size:</td>
              <td>{property.lotsize} acres</td>
              <td>
                <input
                  value={formData.lotsize}
                  type="number"
                  name="lotsize"
                  onChange={handleFormChange}
                />
              </td>
            </tr>
            <tr>
              <td>Type:</td>
              <td>{property.type}</td>
              <td>
                <input
                  value={formData.type}
                  name="type"
                  onChange={handleFormChange}
                />
              </td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{property.description}</td>
              <td>
                <textarea
                  value={formData.description}
                  name="description"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      description: event.target.value,
                    })
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div id="editAssets--buttons">
          <button onClick={handlePut}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </>
  );
}

export default AssetEdit;
