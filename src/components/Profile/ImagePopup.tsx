import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Modal from "../Modal/Modal";
import LoadingComments from "../LoadingStates/LoadingComments";
import CommentsSection from "../Modal/components/Comments";
import { RootState } from "../../store/store";
import useComments from "../../hooks/useQueryHooks/useComments";

type FormValues = {
  comment: string;
};

const ImagePopup = () => {
  const popupRef = useRef<HTMLDivElement>(null)!;
  const uid = localStorage.getItem("uid")!;
  const selectedPost = useSelector(
    (state: RootState) => state.modal.selectedPost,
  );
  const { register, handleSubmit, setFocus, reset } = useForm<FormValues>({
    mode: "onChange",
  });

  const commentsMutation = useComments("mutation");
  const commentsQuery = useComments("query", uid, selectedPost?.id);

  useEffect(() => {
    setFocus("comment");
  }, []);

  return (
    <Modal
      ref={popupRef}
      modalModifier="popup--image"
      containerModifier="popup__container--image"
    >
      <div className="popup--image__container">
        <img
          src={selectedPost?.imgsrc}
          alt={selectedPost?.city}
          className="popup__image"
        />
        <div className="textarea">
          <p className="popup__caption">{selectedPost?.city}</p>
          <ul className="comments">
            {commentsQuery?.isLoading ? (
              <LoadingComments />
            ) : (
              <CommentsSection comments={commentsQuery?.data} />
            )}
          </ul>
          <form
            onSubmit={handleSubmit((data: FormValues) => {
              reset();
              return commentsMutation.mutate({
                ...data,
                post: selectedPost,
                id: uid,
              });
            })}
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
    </Modal>
  );
};

export default ImagePopup;
