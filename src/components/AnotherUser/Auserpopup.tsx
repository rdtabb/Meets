import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Modal from "../Modal/Modal";

import useComments from "../../hooks/useQueryHooks/useComments";
import CommentsSection from "../Modal/components/Comments";
import LoadingComments from "../LoadingStates/LoadingComments";

type PropsType = {
  id: string | undefined;
};

const Auserpopup = ({ id }: PropsType) => {
  const post = useSelector((state: RootState) => state.modal.selectedPost);
  const popupRef = useRef<HTMLDivElement>(null);

  const commentsMutation = useComments("mutation");
  const commentsQuery = useComments("query", id, post?.id);

  const { register, handleSubmit, setFocus, reset } = useForm<{
    comment: string;
  }>({
    mode: "onChange",
  });

  useEffect(() => {
    if (window.innerWidth > 690) setFocus("comment");
  }, []);

  return (
    <Modal
      ref={popupRef}
      modalModifier="popup--image"
      containerModifier="popup__container--image"
    >
      <div className="popup--image__container">
        <img src={post?.imgsrc} alt={post?.city} className="popup__image" />
        <div className="textarea">
          <p className="popup__caption"></p>
          <ul className="comments">
            {commentsQuery?.isLoading ? (
              <LoadingComments />
            ) : (
              <CommentsSection comments={commentsQuery?.data} />
            )}
          </ul>
          <form
            onSubmit={handleSubmit((data) => {
              reset();
              return commentsMutation.mutate({
                comment: data.comment,
                post,
                id,
              });
            })}
          >
            <input
              placeholder="Leave your comment..."
              type="text"
              className="popup__comment"
              {...register("comment")}
            />
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Auserpopup;
