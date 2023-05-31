import PostList from "./PostList";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import LikedHeader from "./LikedHeader";
import LikedDesc from "./LikedDesc";
import NoLiked from "./NoLiked";
import Footer from "../Profile/Footer";
import useUserData from "../../hooks/useQueryHooks/useUserData";
import Loading from "../LoadingStates/LoadingPosts";
import Container from "../Container/Container";

const LikedPosts = () => {
  const userSet = useUserData();

  return (
    <ErrorBoundary>
      <Container>
        <LikedHeader />
        <LikedDesc
          userPicture={userSet.data?.imgurl}
          username={userSet.data?.name}
          status={userSet.data?.newStatus}
          loading={userSet.isLoading}
        />
        {userSet.isLoading ? (
          <Loading />
        ) : userSet.data?.liked.length ? (
          <PostList posts={userSet.data?.liked} />
        ) : (
          <NoLiked />
        )}
        <Footer />
      </Container>
    </ErrorBoundary>
  );
};

export default LikedPosts;
