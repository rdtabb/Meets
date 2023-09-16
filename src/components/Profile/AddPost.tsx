import useGeneralContext from "../../hooks/useContextHooks/useGeneralContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandleNewPostData } from "../../App";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPostSchema } from "../../schemas/addPostSchema";
import { useDispatch } from "react-redux";
import { setOpenPopupType } from "../../features/modal/modalSlice";
import { useEffect, useRef } from "react";
import { handlePopup } from "../../methods/methods";

const AddPost = () => {
  const { handleNewPost } = useGeneralContext();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { mutate, isLoading } = useMutation({
    mutationFn: (variables: HandleNewPostData) => handleNewPost(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(["postsdata"]);
    },
  });

  const popupRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
  } = useForm<HandleNewPostData>({
    resolver: zodResolver(addPostSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const popup = popupRef.current;

    popup && handlePopup(popup, "open");
    setFocus("url");
  }, []);

  const closeAddPostPopup = async () => {
    const popup = popupRef.current;

    popup && (await handlePopup(popup, "close"));
    dispatch(setOpenPopupType("close"));
  };

  return (
    <div ref={popupRef} data-visible="false" className="popup popup-add-post">
      <div className="popup__container">
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
              {errors.url && (
                <p className="popup__error">{errors.url.message}</p>
              )}
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
        <button
          onClick={closeAddPostPopup}
          type="button"
          className="popup__close"
        ></button>
      </div>
    </div>
  );
};

export default AddPost;
