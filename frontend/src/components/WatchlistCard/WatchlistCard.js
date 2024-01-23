import { Link } from "react-router-dom";
import "./WatchlistCard.css";

export default function WatchlistCard(props) {
  if (!props) return <h1>Loading...</h1>;
    return (
      <div id="Watchlistcard--container">
        <div>
          <img
            src={props.props.photos[0].photo}
            height={250}
            width={250}
            alt="Property"
            className="Watchlistcard--image"
          />
        </div>
        <div id="Watchlistcard--info">
          <h2>{props.props.title}</h2>
          <p>5 *****</p>
          <p>{props.props.description}</p>
          <p>
            {props.props.city}, {props.props.state}
          </p>
          <Link to={`/property/${props.props.id}`}>
            <button id="Watchlist-Button">See Property</button>
          </Link>
        </div>
      </div>
    );
}