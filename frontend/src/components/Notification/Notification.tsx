import Person from "../../assets/person.jpg";
import "./Notification.css";
import { Rating } from "types/rating"

function Notification({ rating }: { rating: Rating}) {
  return (
    <div style={{ width: "100%" }}>
      <div className="notification">
        <img
          src={Person}
          height={100}
          width={100}
          alt="profile"
          className="notification-img"
        />
        <div>
          <h3>{rating.user} rated your property</h3>
          <p>{rating.date}</p>
        </div>
      </div>
    </div>
  );
}

export default Notification;
