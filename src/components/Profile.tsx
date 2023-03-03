import Header from "./Header";
import Desc from "./Desc";
import Posts from "./Posts";

type ProfileProps = {
  username: string;
  userPicture: string;
};

const Profile = ({ username, userPicture }: ProfileProps) => {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Desc username={username} userPicture={userPicture} />
        <Posts />
      </main>
    </div>
  );
};

export default Profile;
