import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import propertyService from "services/property/propertyAPI";
// import axios from "services/axiosConfigs";
import "./PropertyReview.css";
import Loading from "components/Loading";

function PropertyReview() {
  const [property, setProperty] = useState(null);
  // A system to check old properties to make changes (Nice to have feature)
  const [check, setCheck] = useState(false);
  const [valid, setValid] = useState({
    address: "",
    lotsize: "",
    rent: "",
    sqft: "",
    type: "",
    bedroom: "",
    bathroom: "",
    garage: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    propertyService
      .getOne(id)
      .then((response) => {
        setProperty(response.data);
        if (response.status === "Approved") {
          setCheck(true);
          // console.log(check)
        }
      })
      .catch((error) => {
        alert(`Error fetching property: ${error}`);
        return <h1>404 property not found</h1>;
      });
  }, [id]);

  const handleValid = (name, value) => {
    if (valid[name] === "valid") {
      setValid((prevValues) => ({
        ...prevValues,
        [name]: "",
      }));
    } else {
      setValid((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const isValid = () => {
    return Object.values(valid).every((value) => value !== "");
  };

  const accept = () => {
    if (isValid()) {
      const confirmation = window.confirm(
        "Are you sure you want to accept the property?"
      );
      if (confirmation) {
        alert("Property has been accepeted and listed");
        onClick(1);
        navigate("/review");
      }
    } else {
      alert("Please validate everything before accepting");
    }
  };

  const reject = () => {
    const confirmation = window.confirm(
      "Are you sure you want to reject the property?"
    );
    if (confirmation) {
      alert("Property has been rejected");
      onClick(2);
      navigate("/review");
    }
  };

  const onClick = (status) => {
    try {
      const formData = new FormData();
      formData.append("propertyID", id);
      formData.append("status", status);

      // axios filepath will possible be changed
      // const request = axios.post("property/reviewProperty/", formData);
      // const request = axios.post("property/reviewProperty/", formData);
      //    request.then((response) => setProperties(response.data));
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };
  if (!property) return <Loading/>
  return (
    <div id="review--wrapper">
      <table id="review--table">
        <tbody>
          <tr>
            <td>Owner:</td>
            <td>{property.owner}</td>
            <td></td>
          </tr>
          <tr>
            <td>Address:</td>
            <td>
              {property.address}, {property.city}, {property.state}{" "}
              {property.zip}
            </td>
            <td>
              <input
                type="checkbox"
                defaultChecked={check}
                name="address"
                value="valid"
                onChange={(e) => handleValid("address", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Rent:</td>
            <td>${property.rent}/month</td>
            <td>
              <input
                type="checkbox"
                defaultChecked={check}
                name="rent"
                value="valid"
                onChange={(e) => handleValid("rent", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Bedrooms:</td>
            <td>{property.bedrooms}</td>
            <td>
              <input
                type="checkbox"
                defaultChecked={check}
                name="bedroom"
                value="valid"
                onChange={(e) => handleValid("bedroom", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Bathrooms:</td>
            <td>{property.bathrooms}</td>
            <td>
              <input
                type="checkbox"
                defaultChecked={check}
                name="bathroom"
                value="valid"
                onChange={(e) => handleValid("bathroom", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Garage:</td>
            <td>{property.garage} car(s)</td>
            <td>
              <input
                type="checkbox"
                defaultChecked={check}
                name="garage"
                value="valid"
                onChange={(e) => handleValid("garage", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Square Footage:</td>
            <td>{property.sqft} sqft</td>
            <td>
              <input
                type="checkbox"
                defaultChecked={check}
                name="sqft"
                value="valid"
                onChange={(e) => handleValid("sqft", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Lot Size:</td>
            <td>{property.lotsize} acres</td>
            <td>
              <input
                type="checkbox"
                defaultChecked={check}
                name="lotsize"
                value="valid"
                onChange={(e) => handleValid("lotsize", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Type:</td>
            <td>{property.type}</td>
            <td>
              <input
                type="checkbox"
                defaultChecked={check}
                name="type"
                value="valid"
                onChange={(e) => handleValid("type", e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div id="review--button">
        <button onClick={accept}>Accept</button>
        <button onClick={reject}>Reject</button>
      </div>
    </div>
  );
}

export default PropertyReview;
