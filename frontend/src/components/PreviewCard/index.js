import "./styles.css";
import lock from "assets/lock.svg";
import { Link } from "react-router-dom";
import { useReducer } from "react";

function switchImage(state, action) {
  switch (action.type) {
    case 'previous':
      const prevIndex = state.index - 1;
      return { index: prevIndex, images: state.images };
    case 'next':
      const nextIndex = state.index + 1;
      return { index: nextIndex, images: state.images };
    default:
      throw new Error('Invalid action type');
  }
}

export default function PreviewCard({ property }) {
  const [state, dispatch] = useReducer(switchImage, { index: 0, images: property.photos });

  return (
    <>
      {!property ? (
          <h1>Loading...</h1>
      ) : (
        <div className="preview-item-card">
          <div className="preview-image-container">
              {state.index > 0 ? <button onClick={() => dispatch({type: "previous"})} className="preview-image-button button-left">&lt;</button> : <div></div>}
              {state.index < property.photos.length - 1 ? <button onClick={() => dispatch({type: "next"})} className="preview-image-button button-right">&gt;</button> : <div></div>}
            <Link
              to={`/property/${property.id}`}
              data-testid="preview-link"
            >
              <img src={state.images[state.index].photo} alt="preview" className="preview-image"/>
            </Link>
          </div>
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
      )}
    </>
  );
}
