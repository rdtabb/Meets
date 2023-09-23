import { auth, provider, db } from "../firebase-config";
import {
  signInWithPopup,
  getAdditionalUserInfo,
  AdditionalUserInfo,
} from "firebase/auth";
import Cookies from "universal-cookie";
import {
  setDoc,
  doc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import MeetsLogoIcon from "../assets/meets-logo.svg";
import GoogleIcon from '../assets/google-icon.svg'
import useGeneralContext from "../hooks/useContextHooks/useGeneralContext";

export const Auth = () => {
  const cookies = new Cookies();
  const { setIsAuth } = useGeneralContext();
  const signin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const info: AdditionalUserInfo | null = getAdditionalUserInfo(response);
      const isNew: boolean | undefined = info?.isNewUser;
      cookies.set("auth-token", response.user.refreshToken);
      const name: string | null = response.user.displayName;
      const imgurl: string | null = response.user.photoURL;
      const id: string = response.user.uid;
      const docref: DocumentReference<DocumentData> = doc(db, "users", `${id}`);
      localStorage.setItem("uid", `${id}`);

      if (!isNew) {
        try {
          setIsAuth(true);
        } catch (err) {
          console.log(err);
        }
      }

      if (isNew) {
        try {
          await setDoc(docref, {
            name: name,
            imgurl: imgurl,
            id,
            newPosts: [],
            liked: [],
            newStatus: "Add your status!",
          });
          setIsAuth(true);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="auth">
      <div className="img-container">
        <img className="auth__logo" src={MeetsLogoIcon} alt="meets-logo" />
      </div>
      <h1 className="auth__header">Sign in with Google</h1>
      <button onClick={signin} className="auth__signin">
        <img className="signin-icon" src={GoogleIcon} alt="Google icon" />
        Sign in
      </button>
    </main>
  );
};
