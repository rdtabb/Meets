import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { cookies } from "../../App";
import useGeneralContext from "../../hooks/useContextHooks/useGeneralContext";

const SignoutConfirm = () => {
  const { setIsAuth } = useGeneralContext();

  const signout = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
  };

  const handleClose = (e: any) => {
    e.target.closest(".popup_opened").classList.remove("popup_opened");
  };

  return (
    <div data-visible="false" className="popup popup--confirm">
      <div className="popup__container">
        <form name="popupForm" className="popup__form" noValidate>
          <h2 className="popup__header">Are you sure?</h2>
          <button type="submit" className="popup__submit" onClick={signout}>
            Confirm
          </button>
        </form>
        <button
          type="button"
          className="popup__close"
          onClick={handleClose}
        ></button>
      </div>
    </div>
  );
};

export default SignoutConfirm;
