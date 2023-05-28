import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import LoadingMessages from "../LoadingStates/LoadingMessages"

const Userlist = () => {
  const usersDataRef = collection(db, "users");
  const getUsers = async () => {
    const data: any = await getDocs(usersDataRef);
    return data.docs.map((doc: any) => ({ ...doc.data() }));
  };
  const usersQuery = useQuery({
    queryFn: getUsers,
    queryKey: ["userlist"]
  })

  if (usersQuery.isLoading) {
    return (
      <main className="search">
      <header className="header header--search">
        <img
          src="src/assets/meets-logo.svg"
          alt="Meets-logo"
          className="header__logo"
        ></img>
        <div className="header__routes">
          <Link to="/">
            <img
              className="header__icon"
              src="../../../public/profile-icon.svg"
              alt=""
            />
          </Link>
        </div>
      </header>
      <LoadingMessages />
    </main>
    )
  } 

  return (
    <main className="search">
      <header className="header header--search">
        <img
          src="src/assets/meets-logo.svg"
          alt="Meets-logo"
          className="header__logo"
        ></img>
        <div className="header__routes">
          <Link to="/">
            <img
              className="header__icon"
              src="../../../public/profile-icon.svg"
              alt=""
            />
          </Link>
        </div>
      </header>
      <ul className="search__userlist">
        {usersQuery.data.map((user: any) => (
          <li key={user.id} className="user">
            <div className="user__wrapper">
              <img className="user__picture" src={user.imgurl} alt="" />
              <article className="user__desc">
                <p className="user__heading">{user.name}</p>
                <p className="user__status">{user.newStatus}</p>
              </article>
            </div>
            <div className="user__icons">
              <Link to="/chat" state={{ name: user.name }}>
                <img className="user__chat" src="src/assets/chats.svg" alt="" />
              </Link>
              <Link to={`/user/${user.id}`}>
                <img
                  className="user__icon"
                  src="src/assets/profile-icon.svg"
                  alt=""
                />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Userlist;
