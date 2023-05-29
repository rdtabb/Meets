import { useContext } from "react"
import LikedContext from "../../context/LikedContext"
import PostList from "./PostList"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import LikedHeader from "./LikedHeader"
import LikedDesc from "./LikedDesc"
import NoLiked from "./NoLiked"
import Footer from "../Profile/Footer"
import useUserData from "../../hooks/useQuery/useUserData"

const LikedPosts = () => {
    const { likedPosts } = useContext(LikedContext)
    const userSet = useUserData()

    if (userSet.isLoading) {
        console.log("loading");
      } else {
        console.log(userSet.data)
      }

    return (
        <ErrorBoundary>
            <div className="container">
                <LikedHeader />
                <LikedDesc 
                    userPicture={userSet.data?.imgurl} 
                    username={userSet.data?.name} 
                    status={userSet.data?.newStatus}
                />
                {likedPosts.length ? (
                    <PostList />
                ) : (
                    <NoLiked />
                )}
                <Footer />
            </div>
        </ErrorBoundary>
    )
}

export default LikedPosts
