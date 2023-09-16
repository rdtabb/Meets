import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setOpenPopupType } from "../../features/modal/modalSlice";
import { handlePopup, handleAddComment } from "../../methods/methods";

import LoadingComments from "../LoadingStates/LoadingComments";
import { Comment, AddCommentMutationProps } from "../../types/Types";
import { RootState } from "../../store/store";

type FormValues = {
  comment: string;
};

const ImagePopup = () => {
  const dispatch = useDispatch();
  const popupRef = useRef<HTMLDivElement>(null)!;
  const selectedPost = useSelector(
    (state: RootState) => state.modal.selectedPost,
  );
  const { register, handleSubmit, setFocus } = useForm<FormValues>({
    mode: "onChange",
  });

  const commentsMutation = useMutation({
    mutationFn: (data: AddCommentMutationProps) => handleAddComment(data),
  });

  useEffect(() => {
    const popup = popupRef.current;

    popup && handlePopup(popup, "open");
    setFocus("comment");
  }, []);

  const closeImagePopup = async () => {
    const popup = popupRef.current!;

    await handlePopup(popup, "close");
    dispatch(setOpenPopupType("close"));
  };

  return (
    <div ref={popupRef} data-visible="false" className={"popup popup--image"}>
      <div className="popup__container popup__container--image">
        <div className="popup--image__container">
          <img
            src={selectedPost?.imgsrc}
            alt={selectedPost?.city}
            className="popup__image"
          />
          <div className="textarea">
            <p className="popup__caption">{selectedPost?.city}</p>
            <ul className="comments">
              {commentsMutation.isLoading ? (
                <LoadingComments />
              ) : (
                <CommentsSection comments={selectedPost?.comments} />
              )}
            </ul>
            <form
              onSubmit={handleSubmit((data: FormValues) =>
                commentsMutation.mutate({ ...data, post: selectedPost }),
              )}
            >
              <input
                {...register("comment")}
                placeholder="Leave your comment..."
                type="text"
                className="popup__comment"
              />
            </form>
          </div>
        </div>
        <button
          onClick={closeImagePopup}
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
