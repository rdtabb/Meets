import { useParams } from "react-router-dom";
import Aheader from "./Aheader";
import Adesc from "./Adesc";
import Aposts from "./Aposts";
import Footer from "../Profile/Footer";
import ImagePopup from "../Profile/ImagePopup";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { Params } from "react-router-dom";
import { newPostsType } from "../../context/GeneralContext";

export type likedType = {
  city: string,
  creator: string,
  id: number,
  imgsrc: string
}

type Usertype = {
  id: string,
  imgurl: string,
  liked: Array<likedType>,
  name: string,
  newPosts: Array<newPostsType>,
  newStatus: string
}

const Auser = () => {
  const [user, setUserData] = useState<Usertype>()
  const [userPosts, setUserPosts] = useState([])
  const { id }: Readonly<Params<string>> = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userdoc = doc(db, "users", id!);
        const data: any = await getDoc(userdoc)
        const docSnap = await data.data()!
        setUserData(docSnap)
        setUserPosts(docSnap.newPosts)
      } catch (err) {
        console.error(err)
      }
    }
    fetchUser()
  }, [])


  return (
    <div className="container">
      <Aheader />
      <Adesc name={user?.name} status={user?.newStatus} url={user?.imgurl} />
      <Aposts posts={userPosts} name={user?.name} />
      <Footer />
      <ImagePopup />
    </div>
  );
};

export default Auser;
