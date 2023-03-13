import { useContext } from "react"
import LikedContext from "../../context/LikedContext"
import { Suspense } from "react"
import ErrorBoundary from "../error/ErrorBoundary"

const PostList = () => {
    const { likedPosts }: any = useContext(LikedContext)

    return (
        <div className="cards">
            <ErrorBoundary>
                <Suspense fallback={<h1>Sorry, something went wrong</h1>}>
                    {likedPosts.map((post: any) => (
                        <div key={post.id} className="card">
                            <img className="card__image" src={post.imgsrc} alt="" />
                            <h2 className="card__description">
                                {post.city}
                            </h2>
                        </div>
                    ))}
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}

export default PostList
