type afeedprops = {
  posts: any
  username: any
}

const Afeed = ({posts, username}: afeedprops) => {

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
            className="card__like"
          ></button>
        </div>
      </article>
    ))}
  </section>
  )
}

export default Afeed
