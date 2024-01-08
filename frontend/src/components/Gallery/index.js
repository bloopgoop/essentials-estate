import { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function Gallery({ photos }) {
  const [mainImage, setMainImage] = useState(null);
  const mainImageRef = useRef(null);

  const switchMainImage = (event) => {
    setMainImage(event.target.src);
  };

  useEffect(() => {
    if (!photos) {
      return <h1>Loading...</h1>
    };
    if (!mainImage) {
      setMainImage(photos[0].img);
    }
    if (mainImageRef.current) {
      mainImageRef.current.classList.remove('fade-in');
      void mainImageRef.current.offsetWidth; // Trigger reflow
      mainImageRef.current.classList.add('fade-in');
    }
  }, [mainImage]); 

  return (
    <>
      <div className="gallery-card">
        <div className="gallery">
          <ul>
            {photos &&
              photos.map((photo, index) => (
                <li key={index} className="clickable">
                  <img src={photo.img} alt={`img${index}`} onClick={switchMainImage} className="fade-in"/>
                </li>
              ))}
          </ul>
        </div>

        <div className="main-image">
          <img src={mainImage} alt="main-img" ref={mainImageRef} className="fade-in"/>
        </div>
      </div>

      <div>
        {photos && photos[0].description}
      </div>
    </>
  );
}
