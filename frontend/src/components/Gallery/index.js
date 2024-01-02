import "./styles.css";

export default function Gallery({ photos }) {
  if (!photos) return <h1>Loading...</h1>;

  return (
    <>
      <div className="gallery-card">
        <div className="gallery">
          <ul>
            {photos &&
              photos.map((photo, index) => (
                <li key={index}>
                  <img src={photo} alt={`img${index}`} />
                </li>
              ))}
          </ul>
        </div>

        <div className="main-image">
          <img src={photos && photos[0]} alt="main-img" />
        </div>
      </div>
    </>
  );
}
