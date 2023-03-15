// import Feed from "./Feed";
import ErrorBoundary from "../error/ErrorBoundary";
import React, { Suspense } from "react";

const Feed = React.lazy(() => import('./Feed'))

type postsprops = {
  posts: any;
  handleLike: any;
  handleDelete: any
};

const Posts = ({ posts, handleLike, handleDelete }: postsprops) => {
  return (
    <>
      {posts.length ? (
        <ErrorBoundary>
          <Suspense fallback={<p>Loading posts...</p>}>
            <Feed 
              posts={posts}
              handleDelete={handleDelete}
              handleLike={handleLike}
            />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <section className="cards cards--empty">
          <div className="cards--empty__wrapper">
            <img src="src/assets/box.svg" alt="" className="cards--empty__img" />
            <h1 className="cards--empty__header">Whoopsies, your feed is empty! Click plus button to add post</h1>
          </div>
        </section>
      )}
    </>
  );
}
export default Posts
