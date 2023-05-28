import useGeneralContext from "../../hooks/useGeneralContext";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { HandleNewPostData } from "../../App";

type addpostprops = {
  handleNewPost: (variables: HandleNewPostData) => Promise<void>;
};

type AddPostData = {
  url: string;
  place: string;
};

const AddPost = ({ handleNewPost }: addpostprops) => {
  const { handleClose } = useGeneralContext();

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
  } = useForm<AddPostData>({
    resolver: zodResolver(addPostSchema),
  });

  return (
    <div data-visible="false" className="popup popup-add-post">
      <div className="popup__container">
        <form
          onSubmit={handleSubmit(handleNewPost)}
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
