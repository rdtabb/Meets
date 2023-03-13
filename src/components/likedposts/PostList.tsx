import { useContext } from "react"
import LikedContext from "../../context/LikedContext"
import { Suspense } from "react"
import ErrorBoundary from "../error/ErrorBoundary"

const PostList = () => {
    const { likedPosts, handleDelete }: any = useContext(LikedContext)

    return (
        <section className="cards">
            <ErrorBoundary>
                <Suspense fallback={<h1>Loading...</h1>}>
                    {likedPosts.map((post: any) => (
                        <article key={post.id} className="card">
                            <img className="card__image" src={post.imgsrc} alt={post.city} />
                            <div className="card__action">
                               <h2 className="card__description">
                                    {post.city}
                                </h2> 
                            </div>
                            <button
                                className="card__delete"
                                onClick={() => handleDelete(post.id)}
                            ></button>
                        </article>
                    ))}
                </Suspense>
            </ErrorBoundary>
        </section>
    )
}

export default PostList
