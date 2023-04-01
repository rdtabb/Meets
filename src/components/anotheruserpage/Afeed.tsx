import { useContext } from "react"
import LikedContext from "../../context/LikedContext"
import GeneralContext from "../../context/GeneralContext"
import { newPostsType } from "../../context/GeneralContext"

type afeedprops = {
  posts: newPostsType[],
  username: string | undefined
}

const Afeed = ({posts, username}: afeedprops) => {
  const { handleLike }: any = useContext(LikedContext)
  const { openImagePopup } = useContext(GeneralContext)

  return (
    <section className="cards">
    {posts.map((post: newPostsType) => (
      <article key={post.id} className="card">
        <div className="card__imgwrapper">
          <img onClick={() => openImagePopup(post.imgsrc, post.city, post.id)} src={post.imgsrc} alt={post.city} className="card__image"></img>
        </div>
        <div className="card__action">
          <h2 className="card__description">{post.city}</h2>
          <button
            type="button"
            style={
              post.liked
                ? {
                  backgroundImage: "url(../../../public/like-activep.svg)",
                } : {
                  backgroundImage: "url(../../../public/likep.svg)",
                }
            }
            className="card__like card__like--auser"
            onClick={(e) => handleLike(e, post.city, post.imgsrc, username)}
          ></button>
        </div>
      </article>
    ))}
  </section>
  )
}

export default Afeed
