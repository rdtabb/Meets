import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { cookies } from "../../App";
import useGeneralContext from "../../hooks/useGeneralContext";

const Signout = () => {
  const { setIsAuth } = useGeneralContext();

  const signout = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
  };

  return (
    <button onClick={signout} className="signout">
      Sign Out
    </button>
  );
};

export default Signout;
