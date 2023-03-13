import { useContext } from "react"
import LikedContext from "../../context/LikedContext"
import PostList from "./PostList"
import { Link } from "react-router-dom"
import ErrorBoundary from "../error/ErrorBoundary"

const LikedPosts = () => {
    const { likedPosts }: any = useContext(LikedContext)

    return (
        <ErrorBoundary>
            <div className="container">
                {likedPosts.length ? (
                    <PostList />
                ) : (
                    <p>you do not have liked posts</p>
                )}
                <Link to='/'>
                    back to profile
                </Link>
            </div>
        </ErrorBoundary>
    )
}

export default LikedPosts
