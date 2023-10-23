import './LikedSection.css';
import lock from '../../assets/lock.svg'

export default function LikedSection({ properties }) {

    const first = properties[0];
    const rest = properties.slice(1);

    return (
        <section id="liked-section">
          <div id="main-liked-card">
            <div className="similar-item-card">
              <img src={first.photos[0]} alt="main-liked"></img>
              <div className="similar-card-description">
                <h3>{first.title}</h3>
                <img src={lock} alt="star"></img>
                <p>{first.description}</p>
                <i>Monthly rent: {first.rent}</i>
              </div>
            </div>
          </div>

          <ul>
            {rest.map((property, index) => (
                <li key={index}>
                    <img src={property.photos[0]} alt={`card${index}`}></img>
                    <div className="similar-card-description hor-description">
                        <h3>{property.title}</h3>
                        <img src={lock} alt="star"></img>
                        <p>{property.description}</p>
                        <i>Monthly rent: {property.rent}</i>
                    </div>
              </li>
            ))}
          </ul>
        </section>
    )
}