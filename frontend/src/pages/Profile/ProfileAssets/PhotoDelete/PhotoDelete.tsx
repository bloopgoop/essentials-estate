import Error from "pages/Error/Error";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "services/axiosConfigs";
import propertyService from "services/property/propertyAPI";
import "./PhotoDelete.css";
import { Property } from "types/property";

function PhotoDelete() {
  // useLocation gets the data passed from the previous page
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [avgRating, setAvgRating] = useState(0);
  const photoDeleteFormRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const request = axios.get(`property/rating/${id}`);
    request.then((response) => setAvgRating(response.data.average_value));

    propertyService
      .getOne(id)
      .then((response) => {
        console.log(response.data);
        setProperty(response.data);
      })
      .catch((error) => {
        alert(`Error fetching property: ${error}`);
        return <h1>404 property not found</h1>;
      });
  }, [id]);

  // return back to this, messy function
  const handleSubmit = () => {
    const photoElement =
      photoDeleteFormRef.current?.elements.namedItem("photo");
    if (!photoElement) {
      return;
    }
    if (photoElement instanceof RadioNodeList) {
      for (let i = 0; i < photoElement.length; i++) {
        const item = photoElement[i];
        if (item instanceof HTMLInputElement && item.checked) {
          axios
            .delete(`property/photo/delete/${item.value}`)
            .then((response) => {
              console.log(response.data);
              alert("Photo(s) deleted successfully");
            })
            .catch((error) => {
              alert(`Error deleting photos: ${error}`);
            });
        }
      }
    }
  };

  return (
    <>
      {!id ? (
        <Error props={{ error: "Missing ID", code: 498 }} />
      ) : (
        <div id="add-photos">
          <h1>Edit Photos</h1>
          {property && (
            <div>
              <form ref={photoDeleteFormRef}>
                <div className="grid">
                  {property.photos.map((photo, key) => (
                    <div className="grid-item" key={key}>
                      <input type="checkbox" name="photo" value={photo.id} />
                      {photo.description}
                      <div className="preview-image-container">
                        <img
                          src={photo.photo}
                          alt="preview"
                          className="preview-image"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <input
                  type="submit"
                  value="Delete"
                  onClick={handleSubmit}
                  id="delete-button"
                />
              </form>
              <table>
                <tbody>
                  <tr>
                    <td>Owner:</td>
                    <td>{property.owner}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>
                      {property.address}, {property.city}, {property.state}{" "}
                      {property.zip}
                    </td>
                  </tr>
                  <tr>
                    <td>Rent:</td>
                    <td>${property.rent}/month</td>
                  </tr>
                  <tr>
                    <td>Bedrooms:</td>
                    <td>{property.bedrooms}</td>
                  </tr>
                  <tr>
                    <td>Bathrooms:</td>
                    <td>{property.bathrooms}</td>
                  </tr>
                  <tr>
                    <td>Garage:</td>
                    <td>{property.garage} car(s)</td>
                  </tr>
                  <tr>
                    <td>Square Footage:</td>
                    <td>{property.sqft} sqft</td>
                  </tr>
                  <tr>
                    <td>Lot Size:</td>
                    <td>{property.lotsize} acres</td>
                  </tr>
                  <tr>
                    <td>Type:</td>
                    <td>{property.type}</td>
                  </tr>
                  <tr>
                    <td>Stars:</td>
                    <td>{Math.round(avgRating * 10) / 10}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default PhotoDelete;
