type feedprops = {
  posts: any;
  handleLike: any;
  handleDelete: any;
};

const Feed = ({ posts, handleLike, handleDelete }: feedprops) => {
  return (
    <section className="cards">
      {posts.map((post: any) => (
        <article key={post.id} className="card">
          <img src={post.imgsrc} alt={post.city} className="card__image"></img>
          <div className="card__action">
            <h2 className="card__description">{post.city}</h2>
            <button
              onClick={() => handleLike(post.id)}
              type="button"
              style={
                post.liked
                  ? {
                      backgroundImage: "url(src/assets/like-active.svg)",
                    }
                  : {
                      backgroundImage: "url(src/assets/like.svg)",
                    }
              }
              className="card__like"
            ></button>
          </div>
          <button
            onClick={() => handleDelete(post.id)}
            className="card__delete"
          ></button>
        </article>
      ))}
    </section>
  );
};

export default Feed;
