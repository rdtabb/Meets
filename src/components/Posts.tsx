import React from "react";

type postsprops = {
  posts: any;
  handleLike: any;
};

const Posts = ({ posts, handleLike }: postsprops) => {
  return (
    <section className="cards">
      {posts.map((post: any) => (
        <article key={post.id} className="card">
          <img src={post.imgsrc} alt="" className="card__image"></img>
          <div className="card__action">
            <h2 className="card__description">{post.city}</h2>
            <button
              onClick={() => handleLike(post.id)}
              type="button"
              style={(post.liked) ? {
                backgroundImage: 'url(public/like-active.svg)'
              } : {
                backgroundImage: 'url(public/like.svg)'
              }}
              className="card__like"
            ></button>
          </div>
        </article>
      ))}
    </section>
  );
};

export default Posts;
