import { useState, useEffect, useRef } from "react";
import imageNotFound from "assets/image-not-found.jpg";
import "./Gallery.css";
import { PropertyPhoto } from "types/propertyPhoto";
import { cn } from "lib/utils";

export default function Gallery({ photos }: { photos: PropertyPhoto[] }) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const mainImageRef = useRef<HTMLImageElement>(null);

  const switchMainImage = (index: number) => {
    setGalleryIndex(index);
  };

  // Fade in effect
  useEffect(() => {
    if (photos.length === 0) return;

    if (mainImageRef.current) {
      mainImageRef.current.classList.remove("fade-in");
      void mainImageRef.current.offsetWidth; // Trigger reflow
      mainImageRef.current.classList.add("fade-in");
    }
  }, [galleryIndex, photos]);

  if (photos.length === 0) {
    return (
      <div className="gallery-card bg-accent">
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
    );
  }

  return (
    <>
        <div className="gallery-card bg-accent">
          <div className="gallery">
            <ul className="overflow-x-hidden">
              {photos &&
                photos.map((photo, index) => (
                  <li
                    key={index}
                    className={cn(
                      "hover:cursor-pointer",
                      index === galleryIndex ? "ring-4" : ""
                    )}
                  >
                    <img
                      src={photo.photo}
                      alt={
                        photo.description
                          ? photo.description
                          : `Gallery image ${index + 1}`
                      }
                      className="fade-in"
                      title={`Gallery image ${index + 1}`}
                      onClick={() => switchMainImage(index)}
                      data-testid={`img`+index.toString()}
                    />
                  </li>
                ))}
            </ul>
          </div>

          <div className="main-image">
            <img
              src={photos[galleryIndex].photo}
              alt={photos[galleryIndex].description}
              ref={mainImageRef}
              className="fade-in"
              title="main-img"
              data-testid="main-img"
            />
          </div>
        </div>
    </>
  );
}
