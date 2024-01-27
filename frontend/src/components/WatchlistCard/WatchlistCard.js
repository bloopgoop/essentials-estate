import { Link } from "react-router-dom";
import "./WatchlistCard.css";
import imageNotFound from "assets/image-not-found.jpg";
import star from "assets/star.svg";

export default function WatchlistCard(props) {
  if (!props) return <h1>Loading...</h1>;

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
          {`${props.props.address} `}
          {props.props.city}, {props.props.state}
        </h2>
        <h4>Rating: {renderStars()}</h4>
        <h4>Rent: ${props.props.rent}</h4>
        <p>{props.props.description} </p>
        <Link to={`/property/${props.props.id}`}>
          <button id="Watchlist-Button">See Property</button>
        </Link>
      </div>
    </div>
  );
}
