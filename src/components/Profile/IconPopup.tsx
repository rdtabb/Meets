import useGeneralContext from "../../hooks/useContext/useGeneralContext";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type AvatarIconType = {
  url: string;
};

const IconPopup = () => {
  const { handleClose, handleProfileIcon } = useGeneralContext();
  const iconSchema: ZodType<AvatarIconType> = z.object({
    url: z.string().trim().url({
      message: "Invalid url",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AvatarIconType>({
    resolver: zodResolver(iconSchema),
  });

  return (
    <div data-visible="false" id="popup--icon" className="popup popup--icon">
      <div className="popup__container">
        <form
          onSubmit={handleSubmit(handleProfileIcon)}
          name="popupForm"
          className="popup__form"
        >
          <h2 className="popup__header">Edit your profile icon</h2>
          <div className="popup__inputs">
            <fieldset className="popup__set">
              <input
                {...register('url')}
                placeholder="Enter icon url"
                type="text"
                className={errors.url ? "popup__input popup__input_type_error" : "popup__input"}
              ></input>
              {errors.url && (
                <p className="popup__error">{errors.url.message}</p>
              )}
            </fieldset>
          </div>
          <button
            type="submit"
            className="popup__submit"
            disabled={errors.url ? true : false}
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

export default IconPopup;
