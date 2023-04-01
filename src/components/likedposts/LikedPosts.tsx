import { useContext } from "react"
import LikedContext from "../../context/LikedContext"
import PostList from "./PostList"
import ErrorBoundary from "../error/ErrorBoundary"
import LikedHeader from "./LikedHeader"
import LikedDesc from "./LikedDesc"
import NoLiked from "./NoLiked"
import Footer from "../Profile/Footer"

type PropsType = {
    username: string,
    status: string,
    userPicture: string
}

const LikedPosts = ({username, status, userPicture}: PropsType) => {
    const { likedPosts } = useContext(LikedContext)

    return (
        <ErrorBoundary>
            <div className="container">
                <LikedHeader />
                <LikedDesc 
                    userPicture={userPicture} 
                    username={username} 
                    status={status}
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
