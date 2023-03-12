type afeedprops = {
  posts: any
}

const Afeed = ({posts}: afeedprops) => {

  const handleLike = (id: string, name: string, src: string) => {
    console.log(`post information is the following:
      id: ${id},
      name: ${name},
      imgsrc: ${src}
    `)
  }

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
            onClick={() => handleLike(post.id, post.city, post.imgsrc)}
          ></button>
        </div>
      </article>
    ))}
  </section>
  )
}

export default Afeed
