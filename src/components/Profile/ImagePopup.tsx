import { useState } from "react";
import useGeneralContext from "../../hooks/useContextHooks/useGeneralContext";
import type { CommentsQuery, Post } from "../../types/Types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useQuery } from "@tanstack/react-query";

const ImagePopup = () => {
  const { handleClose, handleComment, comments, cuid, postId } =
    useGeneralContext();
  const [currMessage, setCurrMessage] = useState<string>("");

  // const queryComments = async (props: CommentsQuery) => {
  //   const userdoc = doc(db, "users", props.uid);
  //   const dataSnap = await getDoc(userdoc);
  //   const dataset = dataSnap.data();
  //   const posts: Post[] = dataset?.newPosts;

  //   const post = posts.find((postf) => postf.id == props.postId);
  //   return post?.comments;
  // };
  const commentsLoading = false
  // const { isLoading: commentsLoading, data: commentsSet } = useQuery({
  //   queryKey: ["comments"],
  //   queryFn: () =>
  //     queryComments({
  //       uid: cuid,
  //       postId,
  //     }),
  //   enabled: false
  // });

  // if (commentsLoading) {
  //   console.log("loading");
  // } else {
  //   console.log(commentsSet);
  // }

  return (
    <div data-visible="false" className="popup popup--image">
      <div className="popup__container popup__container--image">
        <div className="popup--image__container">
          <img src="" alt="" className="popup__image" />
          <div className="textarea">
            <p className="popup__caption"></p>
            <ul className="comments">
              {commentsLoading ? (
                <p>Loading...</p>
              ) : (
                comments.map((comment) => (
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
                ))
              )}
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

export default ImagePopup;
