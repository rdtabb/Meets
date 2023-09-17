import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditProfilePopupData } from "../../types/Types";
import { formSchema } from "../../schemas/formSchema";
import { handleEditProfile } from "../../methods/methods";
import Modal from "../Modal/Modal";
import useModal, { UseModal } from "../../hooks/useModal";

const Popup = () => {
  const queryClient = useQueryClient();
  const popupRef = useRef<HTMLDivElement>(null);
  const { closePopup }: UseModal = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm<EditProfilePopupData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (variables: EditProfilePopupData) =>
      handleEditProfile(variables).then(() => closePopup(popupRef.current)),
    onSuccess: () => {
      queryClient.invalidateQueries(["userdataset"]);
    },
  });

  useEffect(() => {
    setFocus("username");
  }, []);

  return (
    <Modal ref={popupRef}>
      <form
        onSubmit={handleSubmit((variables) => mutate(variables))}
        name="popupForm"
        className="popup__form"
        noValidate
      >
        <h2 className="popup__header">Edit your profile</h2>
        <div className="popup__inputs">
          <fieldset className="popup__set">
            <input
              {...register("username")}
              placeholder="Edit name..."
              name="username"
              id="username"
              type="text"
              className={
                errors.username
                  ? "popup__input popup__input_type_error"
                  : "popup__input"
              }
            ></input>
            {errors.username && (
              <p className="popup__error">{errors.username.message}</p>
            )}
          </fieldset>
          <fieldset className="popup__set">
            <input
              {...register("status")}
              placeholder="Edit status..."
              name="status"
              id="status"
              type="text"
              className={
                errors.status
                  ? "popup__input popup__input_type_error"
                  : "popup__input"
              }
              required
            ></input>
            {errors.status && (
              <p className="popup__error">{errors.status.message}</p>
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
    </Modal>
  );
};

export default Popup;
