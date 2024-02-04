import Person from "assets/person.jpg";
import star from "assets/star.svg";
import "./Comment.css";
import { Rating } from "types/rating";
import { Separator } from "components/ui/separator";
import { Button } from "components/ui/button";

function Comment({
  rating,
  handlePut,
  handleDelete,
}: {
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
      <Separator />
        <div id="comment--wrapper">
          <div id="comment--heading">
            <div className="flex flex-col items-center mr-4">
              <img
                src={Person}
                className="h-12 w-12 mr-2 rounded-full"
                alt="person"
              />
              <div id="comment--user" className="mr-2">
                {rating.user}
              </div>
              <div id="comment--date">{formattedDate}</div>
            </div>
          <Separator orientation="vertical" />
          </div>

          <div className="flex-1 p-2">
            <div id="comment--post">{rating.comment}</div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex-1">
              <div className="flex flex-row">{renderStars()}</div>
            </div>

            {rating.same_user && (
              <>
            <Button
              onClick={(event) => handlePut(event, rating.id, rating.userID)}
            >
              Update
            </Button>
            <Button
              onClick={(event) => handleDelete(event, rating.id, rating.userID)}
            >
              Delete
            </Button>
            </>
            )}
          </div>
        </div>
    </>
  );
}

export default Comment;
