import './styles.css';

export default function RecommendationCard({ property }) {
    // Working buttons to get the next property?
    // Animations when scrolling through properties?

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            <p>Property type: {capitalize(property.type)}  &nbsp;
                <strong>{`City: ${property.city}`}</strong>
            </p>
            <section id="recommendation-card">
                <div className="dir-btn dir-left offset-left">&lt;</div>
                <div className="dir-btn dir-right offset-right">&gt;</div>

                <div id="gallery">
                    <ul>
                        {property.photos && property.photos.map((photo, index) => (
                            <li key={index}><img src={photo} alt={`img${index}`} /></li>
                        ))}
                    </ul>
                </div>

                <div className="main-image">
                    <img src={property.photos && property.photos[0]} alt="main-img" />
                </div>

                <div className="card-info">
                    <h1>{property.title}</h1>
                    <i>{property.stars}</i>
                    <p>
                        {property.description}
                    </p>
                    <button>Rent</button>
                </div>
            </section>
        </>
    )
}