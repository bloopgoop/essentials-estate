import "./styles.css";

export default function RecommendationCard({ property }) {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (!property) return <h1>Loading...</h1>;

  return (
    <>
      <section id="recommendation-container">
        <h1>{property.title}</h1>

        <div className="split-container">
          <p>
            Property type: {capitalize(property.type)} &nbsp;
            <strong>{`City: ${property.city}`}</strong>
          </p>
          <i>{property.stars}</i>
        </div>

        <div id="reco-card">
          <div id="gallery">
            <ul>
              {property.photos &&
                property.photos.map((photo, index) => (
                  <li key={index}>
                    <img src={photo} alt={`img${index}`} />
                  </li>
                ))}
            </ul>
          </div>

          <div className="main-image">
            <img src={property.photos && property.photos[0]} alt="main-img" />
          </div>
        </div>
      </section>
    </>
  );
}
