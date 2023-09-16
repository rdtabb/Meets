import { useRef, useEffect } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { EditProfilePopupData } from "../../types/Types";
import { formSchema } from "../../schemas/formSchema";
import { setOpenPopupType } from "../../features/modal/modalSlice";
import { handlePopup } from "../../methods/methods";

const Popup = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const popupRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm<EditProfilePopupData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const handleEditProfile = async (variables: EditProfilePopupData) => {
    const uid = localStorage.getItem("uid")!;
    const newstatusdb = {
      name: variables.username,
      newStatus: variables.status,
    };
    const userdoc = doc(db, "users", uid);
    await updateDoc(userdoc, newstatusdb);
    await closeEditProfilePopup();
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (variables: EditProfilePopupData) =>
      handleEditProfile(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(["userdataset"]);
    },
  });

  useEffect(() => {
    const popup = popupRef.current;

    popup && handlePopup(popup, "open");
    setFocus("username");
  }, []);

  const closeEditProfilePopup = async () => {
    const popup = popupRef.current;

    popup && (await handlePopup(popup, "close"));
    dispatch(setOpenPopupType("close"));
  };

  return (
    <div ref={popupRef} data-visible="false" className="popup popup--edit">
      <div className="popup__container">
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
        <button
          onClick={closeEditProfilePopup}
          type="button"
          className="popup__close"
        ></button>
      </div>
    </div>
  );
};

export default Popup;
