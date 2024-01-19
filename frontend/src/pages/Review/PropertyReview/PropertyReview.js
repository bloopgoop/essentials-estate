import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import propertyService from "services/property/propertyAPI";
// import axios from "services/axiosConfigs";
import "./PropertyReview.css";

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
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    propertyService
      .getOne(id)
      .then((response) => {
        setProperty(response);
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
      const request = axios.post("property/reviewProperty/", formData);
      // const request = axios.post("property/reviewProperty/", formData);
      //    request.then((response) => setProperties(response.data));
      
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };

  return (
    <div>
      {property ? (
        <>
          <div>Property Review</div>
          <div>
            <label>
              Address Valid
              <input
                type="checkbox"
                defaultChecked={check}
                name="address"
                value="valid"
                onChange={(e) => handleValid("address", e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Lotsize Valid
              <input
                type="checkbox"
                defaultChecked={check}
                name="address"
                value="valid"
                onChange={(e) => handleValid("lotsize", e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Rent Valid
              <input
                type="checkbox"
                defaultChecked={check}
                name="address"
                value="valid"
                onChange={(e) => handleValid("rent", e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Sqft Valid
              <input
                type="checkbox"
                defaultChecked={check}
                name="address"
                value="valid"
                onChange={(e) => handleValid("sqft", e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Type Valid
              <input
                type="checkbox"
                defaultChecked={check}
                name="address"
                value="valid"
                onChange={(e) => handleValid("type", e.target.value)}
              />
            </label>
          </div>
          <button onClick={accept}>Accept</button>
          <button onClick={reject}>Reject</button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default PropertyReview;
