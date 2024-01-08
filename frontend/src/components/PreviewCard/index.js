import "./styles.css";
import lock from "assets/lock.svg";
import { Link } from "react-router-dom";

export default function PreviewCard({ property }) {
  if (!property) return <h1>Loading...</h1>;

  return (
    <div className="preview-item-card">
      <Link to={`/property/${property.id}`} className="preview-image">
        <img src={property.photos[0].img} alt="preview" />
      </Link>
      <div className="preview-card-description">
        <Link to={`/property/${property.id}`}>
          <h3>
            {property.title
              ? property.title
              : property.address + " " + property.zip + " " + property.city}
          </h3>
        </Link>
        <img src={lock} alt="star"></img>
        <p>{property.description}</p>
        <i>Monthly rent: {property.rent}</i>
      </div>
    </div>
  );
}
