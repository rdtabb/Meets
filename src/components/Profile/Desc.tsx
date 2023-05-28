import useGeneralContext from "../../hooks/useGeneralContext";
import AvatarImage from "./AvatarImage";
import Heading from "./Heading";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

type DescProps = {
  username: string;
  userPicture: string;
  status: string;
};

const Desc = ({ username, userPicture, status }: DescProps) => {
  const { handleAddPostButton, handlePopup } = useGeneralContext();
  const uid: any = localStorage.getItem("uid");

  const handleUserDataset = async () => {
    const userdoc = doc(db, "users", uid);
    const dataSnap = await getDoc(userdoc);
    const dataset = dataSnap.data();
    return dataset
  };

  const userDataQuery = useQuery({
    queryFn: handleUserDataset,
    queryKey: ["userdataset"]
  })

  if (userDataQuery.isLoading) {
    console.log('loading')
  } else {
    console.log(userDataQuery.data)
  }

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <AvatarImage userPicture={userPicture} />
        <div className="profile__info">
          <div className="profile__info-wrapper">
            <Heading username={username} />
            <button
              onClick={handlePopup}
              type="button"
              className="profile__edit-button"
            ></button>
          </div>
          <p className="profile__description">{status}</p>
        </div>
      </div>
      <button
        onClick={handleAddPostButton}
        type="button"
        className="profile__add-button"
      ></button>
    </section>
  );
};

export default Desc;
