import { useContext } from "react"
import LikedContext from "../../context/LikedContext"
import PostList from "./PostList"
import { Link } from "react-router-dom"
import ErrorBoundary from "../error/ErrorBoundary"
import LikedHeader from "./LikedHeader"
import LikedDesc from "./LikedDesc"
import NoLiked from "./NoLiked"

type PropsType = {
    username: string,
    status: string,
    userPicture: string
}

const LikedPosts = ({username, status, userPicture}: PropsType) => {
    const { likedPosts }: any = useContext(LikedContext)

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
            </div>
        </ErrorBoundary>
    )
}

export default LikedPosts
