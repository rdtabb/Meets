import { useState } from "react";
import useGeneralContext from "../../hooks/useContextHooks/useGeneralContext";
import type { Comment } from "../../types/Types";

const ImagePopup = () => {
  const { handleClose, handleComment, comments, cuid, postId } = useGeneralContext();
  const [currMessage, setCurrMessage] = useState<string>("");

  return (
    <div data-visible="false" className="popup popup--image">
      <div className="popup__container popup__container--image">
        <div className="popup--image__container">
          <img src="" alt="" className="popup__image" />
          <div className="textarea">
            <p className="popup__caption"></p>
            <ul className="comments">
              <CommentsSection
                comments={comments}
              />
            </ul>
            <form
              onSubmit={(e) =>
                handleComment(e, currMessage, cuid, setCurrMessage)
              }
            >
              <input
                value={currMessage}
                onChange={(e) => setCurrMessage(e.target.value)}
                placeholder="Leave your comment..."
                type="text"
                className="popup__comment"
              />
            </form>
          </div>
        </div>
        <button
          onClick={handleClose}
          type="button"
          className="popup__close popup__close--image"
        ></button>
      </div>
    </div>
  );
};

type CommentsSectionProps = {
  comments: Comment[] | undefined;
};

const CommentsSection = ({ comments }: CommentsSectionProps) => {
  return (
    <>
        {comments?.map((comment) => (
          <li key={comment.id} className="comment">
            <img className="comment__icon" src={comment.img} alt="" />
            <article>
              <div className="comment__info">
                <p className="comment__creator">{comment.creator}</p>
                <p className="comment__date">{comment.createdAt}</p>
              </div>
              <p className="comment__message">{comment.message}</p>
            </article>
          </li>
        ))}
    </>
  );
};

export default ImagePopup;
