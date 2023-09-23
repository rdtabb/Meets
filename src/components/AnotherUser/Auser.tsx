import { useParams } from "react-router-dom";
import Aheader from "./Aheader";
import Aposts from "./Aposts";
import Footer from "../Profile/Footer";
import Auserpopup from "./Auserpopup";
import Container from "../Container/Container";
import useAuserData from "../../hooks/useQueryHooks/useAuserData";
import LoadingImage from "../LoadingStates/LoadingImage";
import Loading from "../LoadingStates/LoadingPosts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Auser = () => {
  const { id } = useParams();
  const auserData = useAuserData(id!);
  const openPopupType = useSelector(
    (state: RootState) => state.modal.openPopupType,
  );

  return (
    <Container>
      <Aheader />
      <section className="profile">
        <div className="profile__wrapper">
          {auserData.isLoading ? (
            <LoadingImage />
          ) : (
            <img
              className="profile__avatar"
              src={auserData.data?.imgurl}
              alt="User avatar"
            ></img>
          )}
          <div className="profile__info">
            <div className="profile__info-wrapper">
              {auserData.isLoading ? (
                <h1 className="profile__header">Loading...</h1>
              ) : (
                <h1 className="profile__header">{auserData.data?.name}</h1>
              )}
            </div>
            {auserData.isLoading ? (
              <p className="profile__description">Loading...</p>
            ) : (
              <p className="profile__description">
                {auserData.data?.newStatus}
              </p>
            )}
          </div>
        </div>
      </section>
      {auserData.isLoading ? (
        <Loading />
      ) : (
        <Aposts posts={auserData.data?.newPosts} name={auserData.data?.name} />
      )}
      <Footer />
      <>{openPopupType === "image" && <Auserpopup id={id} />}</>
    </Container>
  );
};

export default Auser;
