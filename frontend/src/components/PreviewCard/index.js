import "./styles.css";
import star from "assets/star.svg";
import imageNotFound from "assets/image-not-found.jpg";
import { Link } from "react-router-dom";
import { useEffect, useReducer } from "react";

function switchImage(state, action) {
  switch (action.type) {
    case "previous":
      const prevIndex = state.index - 1;
      return { index: prevIndex, images: state.images };
    case "next":
      const nextIndex = state.index + 1;
      return { index: nextIndex, images: state.images };
    case "reset":
      return { index: 0, images: action.images };
    default:
      throw new Error("Invalid action type");
  }
}

export default function PreviewCard({ property }) {
  const [state, dispatch] = useReducer(switchImage, {
    index: 0,
    images: property.photos,
  });

  useEffect(() => {
    dispatch({ type: "reset", images: property.photos });
  }, [property]);

  return (
    <>
      {!property ? (
        <h1>Loading...</h1>
      ) : (
        <div className="preview-item-card">
          <div className="preview-image-container">
            {state.index > 0 ? (
              <button
                onClick={() => dispatch({ type: "previous" })}
                className="preview-image-button button-left"
              >
                &lt;
              </button>
            ) : (
              <div></div>
            )}
            {state.index < property.photos.length - 1 ? (
              <button
                onClick={() => dispatch({ type: "next" })}  
                className="preview-image-button button-right"
              >
                &gt;
              </button>
            ) : (
              <div></div>
            )}
            {state.images.length > 1 && (
              <p className="preview-image-counter">
                {state.index + 1}/{property.photos.length}
              </p>
            )}
            <Link to={`/property/${property.id}`} data-testid="preview-link">
              {state.images.length > 0 ? (
                <img
                src={state.images[state.index].photo}
                alt="preview"
                className="preview-image"
                />
              ) : (
                <img
                  src={imageNotFound}
                  alt="preview"
                  className="preview-image"
                />
              )}
            </Link>
          </div>

          <Link
            to={`/property/${property.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="preview-card-description">
              <div className="description-header">
                <h3>
                  {property.title
                    ? property.title
                    : property.address +
                      " " +
                      property.zip +
                      " " +
                      property.city}
                </h3>

                <img src={star} alt="star"></img>

                <div>{property.stars}</div>
              </div>

              <p>{property.description}</p>
              <i>Monthly rent: {property.rent}</i>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
