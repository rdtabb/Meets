import { useEffect, useRef } from "react";
import useGeneralContext from "../../hooks/useContextHooks/useGeneralContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setOpenPopupType } from "../../features/modal/modalSlice";
import { handlePopup } from "../../methods/methods";
import { iconSchema } from "../../schemas/iconSchema";

export type AvatarIconType = {
  url: string;
};

const IconPopup = () => {
  const dispatch = useDispatch();
  const popupRef = useRef<HTMLDivElement>(null);
  const { handleProfileIcon } = useGeneralContext();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (variables: AvatarIconType) => handleProfileIcon(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(["userdataset"]);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm<AvatarIconType>({
    resolver: zodResolver(iconSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const popup = popupRef.current;

    popup && handlePopup(popup, "open");
    setFocus("url");
  }, []);

  const closeIconPopup = async () => {
    const popup = popupRef.current;

    popup && (await handlePopup(popup, "close"));
    dispatch(setOpenPopupType("close"));
  };

  return (
    <div
      ref={popupRef}
      data-visible="false"
      id="popup--icon"
      className="popup popup--icon"
    >
      <div className="popup__container">
        <form
          onSubmit={handleSubmit((variables: AvatarIconType) => {
            mutate(variables);
          })}
          name="popupForm"
          className="popup__form"
        >
          <h2 className="popup__header">Edit your profile icon</h2>
          <div className="popup__inputs">
            <fieldset className="popup__set">
              <input
                {...register("url")}
                placeholder="Enter icon url"
                type="text"
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
          </div>
          <button
            type="submit"
            className="popup__submit"
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
        <button
          onClick={closeIconPopup}
          type="button"
          className="popup__close"
        ></button>
      </div>
    </div>
  );
};

export default IconPopup;
