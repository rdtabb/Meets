import { useRef } from "react";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { cookies } from "../../App";
import useGeneralContext from "../../hooks/useContextHooks/useGeneralContext";
import Modal from "../Modal/Modal";

const SignoutConfirm = () => {
  const { setIsAuth } = useGeneralContext();
  const popupRef = useRef<HTMLDivElement>(null);

  const signout = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
  };

  return (
    <Modal ref={popupRef}>
      <form name="popupForm" className="popup__form" noValidate>
        <h2 className="popup__header">Are you sure?</h2>
        <button type="submit" className="popup__submit" onClick={signout}>
          Confirm
        </button>
      </form>
    </Modal>
  );
};

export default SignoutConfirm;
