import { useContext } from "react"
import LikedContext from "../../context/LikedContext"

const PostList = () => {
    const { likedPosts }: any = useContext(LikedContext)

    return (
        <div className="cards">
            {likedPosts.map((post: any) => (
                <div key={post.id} className="card">
                    <img className="card__image" src={post.imgsrc} alt="" />
                    <h2 className="card__description">
                        {post.city}
                    </h2>
                </div>
            ))}
        </div>
    )
}

export default PostList
