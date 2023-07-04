import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useGeneralContext from "../../hooks/useContextHooks/useGeneralContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type EditProfilePopupData = {
  username: string;
  status: string;
};

const Popup = () => {
  const handleEditProfile = async (variables: EditProfilePopupData) => {
    const popup = document.querySelector(".popup");
    popup?.classList.remove("popup_opened");
    popup?.setAttribute("data-visible", "false");
    console.log(variables);
    const uid: any = localStorage.getItem("uid");
    const newstatusdb = {
      name: variables.username,
      newStatus: variables.status,
    };
    console.log(newstatusdb);
    const userdoc = doc(db, "users", uid);
    await updateDoc(userdoc, newstatusdb);
  };

  const { handleClose } = useGeneralContext();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (variables: EditProfilePopupData) =>
      handleEditProfile(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(["userdataset"]);
    },
  });
  const formSchema: ZodType<EditProfilePopupData> = z.object({
    username: z.string().trim().max(70),
    status: z
      .string()
      .trim()
      .min(2, {
        message: "Status must be at lest 2 characters long",
      })
      .max(70),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfilePopupData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div data-visible="false" className="popup popup--edit">
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
            disabled={errors.username || errors.status ? true : false}
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

export default Popup;
