import Person from "assets/person.jpg";
import star from "assets/star.svg";
import "./Comment.css";
import { Rating } from "types/rating";

function Comment({
  rating,
  handlePut,
  handleDelete,
} : {
  rating: Rating;
  handlePut: Function;
  handleDelete: Function;
}) {
  if (!rating) return <h1>Loading</h1>;

  const renderStars = (): JSX.Element[] => {
    const starImages: JSX.Element[] = [];
    for (let i = 0; i < rating.stars; i++) {
      starImages.push(
        <img height="15px" width="17px" key={i} src={star} alt="star" />
      );
    }
    return starImages;
  };

  const originalDate = new Date(rating.date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(originalDate);

  return (
    <>
      {rating.same_user ? (
        <div id="comment--wrapper">
          <div id="comment--heading">
            <img src={Person} alt="person" />
            <div>
              <div id="comment--user">{rating.user}</div>
              <div id="comment--date">{formattedDate}</div>
            </div>
          </div>
          <div id="comment--rating">{renderStars()}</div>
          <div id="comment--post--wrapper">
            <div id="comment--post">{rating.comment}</div>
            <div id="comment--buttons">
              <button
                onClick={(event) => handlePut(event, rating.id, rating.userID)}
              >
                Update
              </button>
              <button
                onClick={(event) => handleDelete(event, rating.id, rating.userID)}
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
              <div id="comment--user">{rating.user}</div>
              <div id="comment--date">{formattedDate}</div>
            </div>
          </div>
          <div id="comment--rating">{renderStars()}</div>
          <div id="comment--post">{rating.comment}</div>
        </div>
      )}
    </>
  );
}

export default Comment;
