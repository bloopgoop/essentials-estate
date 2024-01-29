import imageNotFound from "assets/image-not-found.jpg";
import star from "assets/star.svg";
import { Link, useNavigate } from "react-router-dom";
import { Property } from "types/property";
import "./AssetCard.css";

export default function AssetCard({ property }: { property: Property }) {
  console.log(property)
  const renderStars = (): JSX.Element[] => {
    const starImages: JSX.Element[] = [];
    for (let i = 0; i < property.stars; i++) {
      starImages.push(
        <img height="15px" width="17px" key={i} src={star} alt="star" />
      );
    }
    return starImages;
  };

  const navigate = useNavigate();

  const dropboxRedirect = () => {
    navigate("/add-photo", { state: { id: property.id } });
  };

  return (
    <div id="Assetcard--container">
      <div>
        {property.photos.length === 0 ? (
          <img
            src={imageNotFound}
            height={250}
            className="Assetcard--image"
            alt={property.title}
          />
        ) : (
          <img
            src={property.photos[0].photo}
            height={250}
            width={250}
            className="Assetcard--image"
            alt="property-img"
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div id="Assetcard--info">
        <h2>
          {`${property.address} `}
          {property.city}, {property.state}
        </h2>
        <h4>Rating: {renderStars()}</h4>
        <h4>Rent: ${property.rent}</h4>
        <p>{property.description} </p>

        <Link to={`/profile/assets/${property.id}`}>
          <button id="Assetcard--button">Edit Property</button>
        </Link>
        <Link to={`/profile/assets/photo/${property.id}`}>
          <button id="Assetcard--button" style={{ bottom: "7rem" }}>
            Delete Photo
          </button>
        </Link>
        <button
          id="Assetcard--button"
          style={{ bottom: "4rem" }}
          onClick={dropboxRedirect}
        >
          Add Photos
        </button>
      </div>
    </div>
  );
}
