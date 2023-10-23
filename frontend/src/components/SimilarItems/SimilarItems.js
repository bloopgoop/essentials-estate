import lock from '../../assets/lock.svg'
import './SimilarItems.css'

export default function SimilarItems({ properties }) {

    const firstFour = properties.slice(0, 4);

    return (
        <section id="similar-items-section" >
        <h1>Similar Properties</h1>
        <ul>
            <div className="dir-btn dir-left">&lt;</div>
            <div className="dir-btn dir-right">&gt;</div>
            {firstFour.map((property, index) => (
                <li className="similar-item-card" key={index}>
                <img src={property.photos && property.photos[0]} alt={`card${index}`}></img>
                <div className="similar-card-description">
                  <h3>{property.title}</h3>
                  <img src={lock} alt="star"></img>
                  <i>Monthly Rent: {property.rent}</i>
                </div>
              </li>
            ))}
        </ul>
      </section>
    )
}