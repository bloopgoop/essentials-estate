import './styles.css';
import lock from 'assets/lock.svg';

export default function PreviewCard({ property}) {
    if (!property) return (
        <h1>Loading...</h1>
    );

    return (
        <div className="preview-item-card">
            <img src={property.photos[0]} alt="preview"></img>
            <div className="preview-card-description">
                <h3>{property.title}</h3>
                <img src={lock} alt="star"></img>
                <p>{property.description}</p>
                <i>Monthly rent: {property.rent}</i>
            </div>
        </div>
    )
}