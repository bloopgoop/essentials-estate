import { Link } from "react-router-dom";
import "./AssetCard.css";

export default function AssetCard(props) {
  return (
    <div id="Assetcard--container">
      <div>
        <img
          src={props.props.photos[0].photo}
          height={250}
          width={250}
          className="Assetcard--image"
          alt="property-img"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div id="Assetcard--info">
        <h2>
          {props.props.city}, {props.props.state}
        </h2>
        <p>{props.props.stars}*</p>
        <p>{props.props.description}</p>
        <Link to={`/profile/assets/${props.props.id}`}>
          <button id="Assetcard--button">Edit Property</button>
        </Link>
      </div>
    </div>
  );
}
