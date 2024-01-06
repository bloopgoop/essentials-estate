import "./styles.css";
import "components/PreviewCard/styles.css";
import lock from "assets/lock.svg";
import PreviewCard from "components/PreviewCard";

export default function LikedSection({ properties }) {
  const first = properties[0];
  const rest = properties.slice(1);

  if (!properties) return <h1>Loading...</h1>;

  return (
    <section id="liked-section">
      <div id="main-liked-card">
        <PreviewCard property={first} />
      </div>

      <ul>
        {rest.map((property, index) => (
          <li key={index}>
            <img src={property.photos[0]} alt={`card${index}`}></img>
            <div className="preview-card-description hor-description">
              <h3>{property.title}</h3>
              <img src={lock} alt="star"></img>
              <p>{property.description}</p>
              <i>Monthly rent: {property.rent}</i>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
