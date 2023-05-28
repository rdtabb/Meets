import Userlist from "./Userlist";
import Footer from "../Profile/Footer";

type searchprops = {
  users: any;
};

const Usersearch = ({ users }: searchprops) => {
  return (
    <>
      <Userlist users={users} />
      <div className="container">
        <Footer />
      </div>
    </>
  );
};

export default Usersearch;
