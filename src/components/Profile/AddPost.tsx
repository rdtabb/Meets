import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPostSchema } from "../../schemas/addPostSchema";
import { useEffect, useRef } from "react";
import { handleNewPost } from "../../methods/methods";
import useModal, { UseModal } from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import { HandleNewPostParams } from "../../types/Types";

const AddPost = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { closePopup }: UseModal = useModal();

  const { mutate, isLoading } = useMutation({
    mutationFn: (variables: HandleNewPostParams) =>
      handleNewPost(variables).then(() => closePopup(popupRef.current)),
    onSuccess: () => {
      queryClient.invalidateQueries(["postsdata"]);
    },
  });

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
  } = useForm<HandleNewPostParams>({
    resolver: zodResolver(addPostSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (window.innerWidth > 690) setFocus("url");
  }, []);

  return (
    <Modal ref={popupRef}>
      <form
        onSubmit={handleSubmit((variables) => mutate(variables))}
        name="popupForm"
        className="popup__form"
        noValidate
      >
        <h2 className="popup__header">Add new post</h2>
        <div className="popup__inputs">
          <fieldset className="popup__set">
            <input
              {...register("url")}
              placeholder="Enter picture url..."
              type="url"
              className={
                errors.url
                  ? "popup__input popup__input_type_error"
                  : "popup__input"
              }
            ></input>
            {errors.url && <p className="popup__error">{errors.url.message}</p>}
          </fieldset>
          <fieldset className="popup__set">
            <input
              {...register("place")}
              placeholder="Enter post title..."
              type="text"
              className={
                errors.place
                  ? "popup__input popup__input_type_error"
                  : "popup__input"
              }
              required
            ></input>
            {errors.place && (
              <p className="popup__error">{errors.place.message}</p>
            )}
          </fieldset>
        </div>
        <button
          disabled={!isValid || isLoading}
          type="submit"
          className="popup__submit"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </Modal>
  );
};

export default AddPost;
