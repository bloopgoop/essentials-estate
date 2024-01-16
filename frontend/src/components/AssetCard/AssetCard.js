import { Link } from "react-router-dom";
import "./AssetCard.css";

export default function AssetCard(props) {
  if (!props) return <h1>Loading...</h1>;
  console.log(props)
  return (
    <div id="Assetcard--container">
      <div>
        <img
          src={props.props.photos[0].photo}
          height={250}
          className="Assetcard--image"
          alt={props.title}
        />
      </div>
      <div id="Assetcard--info">
        <h2>Property Name</h2>
        <p>{props.props.stars}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis est
          ipsum, vulputate ac tortor in, tempus ullamcorper est.
        </p>
        <p>New York, NY</p>
      </div>
      <Link to={`/profile/assets/${props.props.id}`}>
        <button>Edit Property</button>
      </Link>
    </div>
  );
}
