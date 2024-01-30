import { Link } from "react-router-dom";
import "./WatchlistCard.css";
import imageNotFound from "assets/image-not-found.jpg";
import star from "assets/star.svg";
import { Property } from "types/property";

export default function WatchlistCard({property}: {property: Property}) {
  if (!property) return <h1>Loading...</h1>;

  const renderStars = (): JSX.Element[] => {
    const starImages: JSX.Element[] = [];
    for (let i = 0; i < property.stars; i++) {
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
            property.photos.length > 0
              ? property.photos[0].photo
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
          {`${property.address} `}
          {property.city}, {property.state}
        </h2>
        <h4>Rating: {renderStars()}</h4>
        <h4>Rent: ${property.rent}</h4>
        <p>{property.description} </p>
        <Link to={`/property/${property.id}`}>
          <button id="Watchlist-Button">See Property</button>
        </Link>
      </div>
    </div>
  );
}
