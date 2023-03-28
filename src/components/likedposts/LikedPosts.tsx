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
    setIsAuth: React.Dispatch<any>
}

const LikedPosts = ({username, status, userPicture, setIsAuth}: PropsType) => {
    const { likedPosts }: any = useContext(LikedContext)

    return (
        <ErrorBoundary>
            <div className="container">
                <LikedHeader setIsAuth={setIsAuth} />
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
