import React from "react";
import "./Comment.css";

function Comment({ props }) {
    if (!props) return <h1>Loading</h1>
    console.log(props)
  return <div id="comment--wrapper">
    <div id="comment--user">
        {props.user}
    </div>
    <div id="comment--rating">
        {props.stars}
    </div>
    <div id="comment--post">
        {props.comment}
    </div>
  </div>;
}

export default Comment;
