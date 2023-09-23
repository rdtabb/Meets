import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { iconSchema } from "../../schemas/iconSchema";
import Modal from "../Modal/Modal";
import useModal, { UseModal } from "../../hooks/useModal";
import { handleProfileIcon } from "../../methods/methods";
import { EditIconMutationProps } from "../../types/Types";

const IconPopup = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const { closePopup }: UseModal = useModal();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (variables: EditIconMutationProps) =>
      handleProfileIcon(variables).then(() => closePopup(popupRef.current)),
    onSuccess: () => {
      queryClient.invalidateQueries(["userdataset"]);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm<EditIconMutationProps>({
    resolver: zodResolver(iconSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (window.innerWidth > 690) setFocus("url");
  }, []);

  return (
    <Modal ref={popupRef}>
      <form
        onSubmit={handleSubmit((variables: EditIconMutationProps) => {
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
            {errors.url && <p className="popup__error">{errors.url.message}</p>}
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

export default IconPopup;
