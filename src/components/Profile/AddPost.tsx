import useGeneralContext from "../../hooks/useContextHooks/useGeneralContext";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { HandleNewPostData } from "../../App";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddPostData = {
  url: string;
  place: string;
};

const AddPost = () => {
  const { handleClose, handleNewPost } = useGeneralContext();
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (variables: HandleNewPostData) => handleNewPost(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(["postsdata"])
    }
  })
  const addPostSchema: ZodType<AddPostData> = z.object({
    url: z.string().trim().url({
      message: "Invalid url",
    }),
    place: z
      .string()
      .trim()
      .min(2, {
        message: "Post title must be at least 2 characters long",
      })
      .max(30),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HandleNewPostData>({
    resolver: zodResolver(addPostSchema),
  });

  return (
    <div data-visible="false" className="popup popup-add-post">
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
            disabled={errors.place || errors.url ? true : false}
            type="submit"
            className="popup__submit"
          >
            Save
          </button>
        </form>
        <button
          onClick={handleClose}
          type="button"
          className="popup__close"
        ></button>
      </div>
    </div>
  );
};

export default AddPost;
