import { useDispatch, useSelector } from "react-redux";
import {
  setOpenPopupType,
  setSelectedPost,
} from "../features/modal/modalSlice";
import { handlePopup } from "../methods/methods";
import { Post } from "../types/Types";
import { RootState } from "../store/store";

const useModal = () => {
  const selectedPost = useSelector(
    (state: RootState) => state.modal.selectedPost,
  );
  const dispatch = useDispatch();

  const closePopup = async (popup: HTMLDivElement | null) => {
    popup && (await handlePopup(popup, "close"));
    dispatch(setOpenPopupType("close"));
  };

  const openImagePopup = (post: Post) => {
    dispatch(setOpenPopupType("image"));
    if (selectedPost?.id !== post.id) dispatch(setSelectedPost(post));
  };

  return {
    closePopup,
    openImagePopup,
  };
};

export type UseModal = ReturnType<typeof useModal>;
export default useModal;
