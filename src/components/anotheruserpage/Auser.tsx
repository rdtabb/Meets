import { useParams } from "react-router-dom";
import Aheader from "./Aheader";
import Adesc from "./Adesc";
import Aposts from "./Aposts";
import Footer from "../Profile/Footer";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

type auserprops = {
  users: any;
};

const Auser = ({ users }: auserprops) => {
  const [user, setUserData] = useState<any>({})
  const [userPosts, setUserPosts] = useState([])
  const { id }: any = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userdoc: any = doc(db, "users", id);
        const data: any = await getDoc(userdoc)
        const docSnap = await data.data()
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
      <Adesc name={user.name} status={user.newStatus} url={user.imgurl} />
      <Aposts posts={userPosts} name={user.name} />
      <Footer />
    </div>
  );
};

export default Auser;
