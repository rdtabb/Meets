import React from "react";

const LoadingComments = () => {
  return (
    <li className="comment comment--empty">
      <img className="comment__icon" src="" alt="" />
      <article>
        <div className="comment__info">
          <p className="comment__creator"></p>
          <p className="comment__date"></p>
        </div>
        <p className="comment__message"></p>
      </article>
    </li>
  );
};

export default LoadingComments;
