import { Link } from "react-router-dom";
import "./WatchlistCard.css";
import imageNotFound from "assets/image-not-found.jpg";

export default function WatchlistCard(props) {
  if (!props) return <h1>Loading...</h1>;
  return (
    <div id="Watchlistcard--container">
      <div>
        <img
          src={
            props.props.photos.length > 0
              ? props.props.photos[0].photo
              : imageNotFound
          }
          height={250}
          width={250}
          alt="property-img"
          className="Watchlistcard--image"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div id="Watchlistcard--info">
        <h2>
          {props.props.city}, {props.props.state}
        </h2>
        <p>{props.props.stars}*</p>
        <p>{props.props.description}</p>
        <Link to={`/property/${props.props.id}`}>
          <button id="Watchlist-Button">See Property</button>
        </Link>
      </div>
    </div>
  );
}
