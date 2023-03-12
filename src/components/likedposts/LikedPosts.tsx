import { useContext } from "react"
import LikedContext from "../../context/LikedContext"
import PostList from "./PostList"
import { Link } from "react-router-dom"

const LikedPosts = () => {
    const { likedPosts }: any = useContext(LikedContext)

    return (
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
    )
}

export default LikedPosts
