import { Link } from "react-router-dom";
import imageNotFound from "assets/image-not-found.jpg";
import "./AssetCard.css";

export default function AssetCard(props) {
  console.log(props);
  if (!props) return <h1>Loading...</h1>;
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
            className="Assetcard--image"
            alt={props.title}
          />
        )}
      </div>
      <div id="Assetcard--info">
        <h2>Property Name</h2>
        <p>{props.props.stars}</p>
        <p>{props.props.description}</p>
        <p>
          {props.props.city}, {props.props.state}
        </p>
      </div>
      <Link to={`/profile/assets/${props.props.id}`}>
        <button>Edit Property</button>
      </Link>
    </div>
  );
}
