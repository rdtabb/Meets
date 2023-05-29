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
  getDoc,
  DocumentReference,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";
import useGeneralContext from "../hooks/useContext/useGeneralContext";
import useLikedContext from "../hooks/useContext/useLikedContext";

export const Auth = () => {
  const cookies = new Cookies();
  const { setLikedPosts } = useLikedContext();
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
      const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docref);

      localStorage.setItem("uid", `${id}`);

      if (!isNew) {
        try {
          const dataset: any = docSnap.data();
          const likedPosts = dataset.liked;
          setLikedPosts(likedPosts);
        } catch (err) {
          console.log(err);
        } finally {
          setIsAuth(true);
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
        } catch (err) {
          console.log(err);
        } finally {
          setIsAuth(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="auth">
      <div className="img-container">
        <img
          className="auth__logo"
          src="src/assets/meets-logo.svg"
          alt="meets-logo"
        />
      </div>
      <h1 className="auth__header">Sign in with Google</h1>
      <button onClick={signin} className="auth__signin">
        <img className="signin-icon" src="src/assets/google-icon.svg" alt="" />
        Sign in
      </button>
    </main>
  );
};
