import { useParams } from "react-router-dom";
import Aheader from "./Aheader";
import Adesc from "./Adesc";
import Aposts from "./Aposts";
import Footer from "../Footer";

type auserprops = {
  users: any;
};

const Auser = ({ users }: auserprops) => {
  const { id } = useParams();
  const user: any = users.find((user: any) => user.id.toString() == id);

  return (
    <div className="container">
      <Aheader />
      <Adesc name={user.name} status={user.newStatus} url={user.imgurl} />
      <Aposts posts={user.newPosts} name={user.name} />
      <Footer />
    </div>
  );
};

export default Auser;
