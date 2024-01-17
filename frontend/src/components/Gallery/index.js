import { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function Gallery({ photos }) {
  const [mainImage, setMainImage] = useState(null);
  const [mainDescription, setMainDescription] = useState(null);
  const mainImageRef = useRef(null);

  const switchMainImage = (event) => {
    setMainImage(event.target.src);
    setMainDescription(event.target.title);
  };

  useEffect(() => {
    if (!mainImage) {
      setMainImage(photos[0].photo);
      setMainDescription(photos[0].description);
    }
    if (mainImageRef.current) {
      mainImageRef.current.classList.remove("fade-in");
      void mainImageRef.current.offsetWidth; // Trigger reflow
      mainImageRef.current.classList.add("fade-in");
    }
  }, [mainImage, photos]);

  return (
    <>
      {!photos ? (
        <div className="gallery-card">
          <h1>No Photos</h1>
        </div>
      ) : (
        <div className="gallery-card">
          <div className="gallery">
            <ul>
              {photos &&
                photos.map((photo, index) => (
                  <li key={index} className="clickable">
                    <img
                      src={photo.photo}
                      alt={`img${index}`}
                      onClick={switchMainImage}
                      className="fade-in"
                      title={photo.description}
                    />
                  </li>
                ))}
            </ul>
          </div>

          <div className="main-image">
            <img
              src={mainImage}
              alt="main-img"
              ref={mainImageRef}
              className="fade-in"
              title={mainDescription}
            />
          </div>
        </div>
      )}
    </>
  );
}
