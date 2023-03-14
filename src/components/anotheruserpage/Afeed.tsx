import { useContext } from "react"
import LikedContext from "../../context/LikedContext"

type afeedprops = {
  posts: any
  username: any
}

const Afeed = ({posts, username}: afeedprops) => {

  const { handleLike }: any = useContext(LikedContext)

  return (
    <section className="cards">
    {posts.map((post: any) => (
      <article key={post.id} className="card">
        <img src={post.imgsrc} alt="" className="card__image"></img>
        <div className="card__action">
          <h2 className="card__description">{post.city}</h2>
          <button
            type="button"
            style={
              post.liked
                ? {
                    backgroundImage: "url(../../../public/like-activep.svg)",
                  }
                : {
                    backgroundImage: "url(../../../public/likep.svg)",
                  }
            }
            className="card__like card__like--auser"
            onClick={() => handleLike(post.city, post.imgsrc, username)}
          ></button>
        </div>
      </article>
    ))}
  </section>
  )
}

export default Afeed
