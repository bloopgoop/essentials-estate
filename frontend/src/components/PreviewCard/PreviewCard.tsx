import imageNotFound from "assets/image-not-found.jpg";
import star from "assets/star.svg";
import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { Property } from "types/property";
import "./PreviewCard.css";

interface imageQueue {
  index: number;
  images: Property["photos"];
}

interface imageQueueAction {
  type: "previous" | "next" | "reset";
  images: Property["photos"] | [];
}

function switchImage(state: imageQueue, action: imageQueueAction) {
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

export default function PreviewCard({ property }: { property: Property }) {
  const initialState: imageQueue = {
    index: 0,
    images: property.photos,
  };

  const [state, dispatch] = useReducer<
    React.Reducer<imageQueue, imageQueueAction>
  >(switchImage, initialState);

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
                onClick={() => dispatch({ type: "previous", images: []})}
                className="preview-image-button button-left"
              >
                &lt;
              </button>
            ) : (
              <div></div>
            )}
            {state.index < property.photos.length - 1 ? (
              <button
                onClick={() => dispatch({ type: "next", images: [] })}
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
                <h3 className="text-xl font-bold">
                  {property.title
                    ? property.title
                    : property.address +
                      " " +
                      property.zip +
                      " " +
                      property.city}
                </h3>

                <img src={star} alt="star"></img>

                <div className="text-lg">{property.stars}</div>
              </div>

              <p className="text-lg">{property.description}</p>
              <i className="text-lg">Monthly rent: {property.rent}</i>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
