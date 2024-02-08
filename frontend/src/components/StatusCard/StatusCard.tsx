import imageNotFound from "assets/image-not-found.jpg";
import { Link } from "react-router-dom";
import { Property } from "types/property";
import "./StatusCard.css";

function StatusCard({ property, page }: { property: Property; page: string }) {
  console.log(property);
  if (!property) return <h1>Loading...</h1>;
  const status = ["Submiting", "In Review", "Listing"];
  const accepted = ["Submitted", "Approved", "Listed"];
  let check = ["", "", ""];
  let step = property.status + 1;
  let currentStatus;
  check[step] = "active";

  if (property.status === 2) {
    check = ["rejected", "rejected", "last-rejected"];
    currentStatus = ["Submitted", "Rejected", "Not Listed"];
  } else {
    if (step === 2) step = 3;
    currentStatus = accepted.slice(0, step).concat(status.slice(step));
    for (let i = 0; i < step; i++) {
      check[i] = "completed";
    }
  }

  return (
    <>
      <div id="Status--container">
        <div>
          <img
            src={
              property.photos.length > 0 ? property.photos[0].photo : imageNotFound
            }
            height={250}
            width={250}
            className="Status--image"
            alt="property-img"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div id="Status--info">
          <h2>
            {`${property.address} `}
            {property.city}, {property.state}
          </h2>
          <h4>Rent: ${property.rent}</h4>
          <p>{property.description} </p>
          <div className="stepper-wrapper">
            {property.status === 2
              ? currentStatus.map((stat, index) => (
                  <div key={index} className={`stepper-item ${check[index]}`}>
                    <div className="step-counter"></div>
                    <div className="step-name">{stat}</div>
                  </div>
                ))
              : currentStatus.map((stat, index) => (
                  <div key={index} className={`stepper-item ${check[index]}`}>
                    <div className="step-counter"></div>
                    <div className="step-name">{stat}</div>
                  </div>
                ))}
          </div>
          <Link to={`/${page}/${property.id}`}>
            <button id="Status--info--button">View Property</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default StatusCard;
