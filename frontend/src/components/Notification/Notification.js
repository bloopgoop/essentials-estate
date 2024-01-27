import React from "react";
import "./Notification.css";
import Person from "../../assets/person.jpg";

function Notification(props) {
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
          <h3>{props.name} rated your property</h3>
          <p>{props.time}</p>
        </div>
      </div>
    </div>
  );
}

export default Notification;
