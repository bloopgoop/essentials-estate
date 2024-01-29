import { useState, useEffect, useRef } from "react";
import imageNotFound from "assets/image-not-found.jpg";
import "./Gallery.css";
import { PropertyPhoto } from "types/propertyPhoto"

export default function Gallery({ photos }: { photos: PropertyPhoto[] }) {
  const [mainImage, setMainImage] = useState("");
  const [mainDescription, setMainDescription] = useState("");
  const mainImageRef = useRef<HTMLImageElement>(null);

  const switchMainImage = (event: React.MouseEvent) => {
    const img = event.target as HTMLImageElement;
    setMainImage(img.src);
    setMainDescription(img.title);
  };

  useEffect(() => {
    if (photos.length === 0) return;
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
      {photos.length === 0 ? (
        <div className="gallery-card">
          <div className="gallery">
            <ul>
              <li>
                <img src={imageNotFound} alt="no-images" />
              </li>
            </ul>
          </div>
          <div className="main-image">
            <img src={imageNotFound} alt="no-images" />
          </div>
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
