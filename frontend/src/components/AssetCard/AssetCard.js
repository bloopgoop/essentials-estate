import { Link } from "react-router-dom";
import imageNotFound from "assets/image-not-found.jpg";
import "./AssetCard.css";
import star from "assets/star.svg";

export default function AssetCard(props) {
  console.log(props);

  const renderStars = () => {
    const starImages = [];
    for (let i = 0; i < props.props.stars; i++) {
      starImages.push(
        <img height="15px" width="17px" key={i} src={star} alt="star" />
      );
    }
    return starImages;
  };

  return (
    <div id="Assetcard--container">
      <div>
        {props.props.photos.length === 0 ? (
          <img
            src={imageNotFound}
            height={250}
            className="Assetcard--image"
            alt={props.title}
          />
        ) : (
          <img
            src={props.props.photos[0].photo}
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
          {`${props.props.address} `}
          {props.props.city}, {props.props.state}
        </h2>
        <h4>Rating: {renderStars()}</h4>
        <h4>Rent: ${props.props.rent}</h4>
        <p>{props.props.description} </p>
        <Link to={`/profile/assets/${props.props.id}`}>
          <button id="Assetcard--button">Edit Property</button>
        </Link>
      </div>
    </div>
  );
}
