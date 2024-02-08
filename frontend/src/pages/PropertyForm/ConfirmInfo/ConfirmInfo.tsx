import { Button } from "components/ui/button";
import AuthContext from "context/AuthContext";
import { usePropertyFormContext } from "pages/PropertyForm/PropertyForm";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import propertyService from "services/property/propertyAPI";

export default function ConfirmInfo() {
  const { propertyForm } = usePropertyFormContext();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(propertyForm.propertyInfo)) {
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

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-10 text-center mt-10">
        Confirm Information
      </h1>
      <div className="w-4/5 flex-1 bg-accent p-10 rounded m-auto">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
          <p>
            <span className="font-semibold">First Name: </span>
            {propertyForm.basicInformation.first_name}
          </p>
          <p>
            <span className="font-semibold">Last Name: </span>
            {propertyForm.basicInformation.last_name}
          </p>
          <p>
            <span className="font-semibold">Date of Birth: </span>
            {propertyForm.basicInformation.dob}
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            {propertyForm.basicInformation.email}
          </p>
          <p>
            <span className="font-semibold">Phone: </span>
            {propertyForm.basicInformation.phone}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-4">Property Information</h2>
          <p>
            <span className="font-semibold">Address: </span>
            {propertyForm.propertyInfo?.address}
          </p>
          <p>
            <span className="font-semibold">City: </span>
            {propertyForm.propertyInfo?.city}
          </p>
          <p>
            <span className="font-semibold">State: </span>
            {propertyForm.propertyInfo?.state}
          </p>
          <p>
            <span className="font-semibold">Zip: </span>
            {propertyForm.propertyInfo?.zip}
          </p>
          <p>
            <span className="font-semibold">Title: </span>
            {propertyForm.propertyInfo?.title}
          </p>
          <p>
            <span className="font-semibold">Rent: </span>
            {propertyForm.propertyInfo?.rent}
          </p>
          <p>
            <span className="font-semibold">Description: </span>
            {propertyForm.propertyInfo?.description}
          </p>
          <p>
            <span className="font-semibold">Bedrooms: </span>
            {propertyForm.propertyInfo?.bedrooms}
          </p>
          <p>
            <span className="font-semibold">Bathrooms: </span>
            {propertyForm.propertyInfo?.bathrooms}
          </p>
          <p>
            <span className="font-semibold">Garage: </span>
            {propertyForm.propertyInfo?.garage}
          </p>
          <p>
            <span className="font-semibold">Sqft: </span>
            {propertyForm.propertyInfo?.sqft}
          </p>
          <p>
            <span className="font-semibold">Lotsize: </span>
            {propertyForm.propertyInfo?.lotsize}
          </p>
          <p>
            <span className="font-semibold">Type: </span>
            {propertyForm.propertyInfo?.type}
          </p>
          <Button onClick={handleSubmit} className="float-right">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
