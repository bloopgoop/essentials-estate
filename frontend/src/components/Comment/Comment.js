import React from "react";
import "./Comment.css";
import Person from "assets/person.jpg";
import star from "assets/star.svg";

function Comment({ props, handlePut, handleDelete }) {
  if (!props) return <h1>Loading</h1>;

  const renderStars = () => {
    const starImages = [];
    for (let i = 0; i < props.stars; i++) {
      starImages.push(
        <img height="15px" width="17px" key={i} src={star} alt="star" />
      );
    }
    return starImages;
  };

  const originalDate = new Date(props.date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(originalDate);

  return (
    <>
      {props.same_user ? (
        <div id="comment--wrapper">
          <div id="comment--heading">
            <img src={Person} alt="person" />
            <div>
              <div id="comment--user">{props.user}</div>
              <div id="comment--date">{formattedDate}</div>
            </div>
          </div>
          <div id="comment--rating">{renderStars()}</div>
          <div id="comment--post--wrapper">
            <div id="comment--post">{props.comment}</div>
            <div id="comment--buttons">
              <button
                onClick={(event) => handlePut(event, props.id, props.userID)}
              >
                Update
              </button>
              <button
                onClick={(event) => handleDelete(event, props.id, props.userID)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div id="comment--wrapper">
          <div id="comment--heading">
            <img src={Person} alt="person" />
            <div>
              <div id="comment--user">{props.user}</div>
              <div id="comment--date">{formattedDate}</div>
            </div>
          </div>
          <div id="comment--rating">{renderStars()}</div>
          <div id="comment--post">{props.comment}</div>
        </div>
      )}
    </>
  );
}

export default Comment;
