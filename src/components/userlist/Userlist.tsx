import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import LoadingUserlist from "../LoadingStates/LoadingUserlist";
import User from "./User";
import ProfileIcon from "../../assets/profile-icon.svg";
import MeetsLogo from "../../assets/meets-logo.svg";

const Userlist = () => {
  const usersDataRef = collection(db, "users");

  const getUsers = async () => {
    const data: any = await getDocs(usersDataRef);
    return data.docs.map((doc: any) => ({ ...doc.data() }));
  };

  const usersQuery = useQuery({
    queryFn: getUsers,
    queryKey: ["userlist"],
  });

  return (
    <main className="search">
      <header className="header header--search">
        <img src={MeetsLogo} alt="Meets-logo" className="header__logo"></img>
        <div className="header__routes">
          <Link to="/">
            <img
              className="header__icon"
              src={ProfileIcon}
              alt="Click to go to profile"
            />
          </Link>
        </div>
      </header>
      <ul className="search__userlist">
        {usersQuery.isLoading ? (
          <LoadingUserlist />
        ) : (
          usersQuery.data?.map((user: any, index: number) => (
            <User key={index} user={user} />
          ))
        )}
      </ul>
    </main>
  );
};

export default Userlist;
