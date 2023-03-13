import Feed from "./Feed";

type postsprops = {
  posts: any;
  handleLike: any;
  handleDelete: any
};

const Posts = ({ posts, handleLike, handleDelete }: postsprops) => {
  return (
    <>
      {posts.length ? (
        <Feed 
          posts={posts}
          handleDelete={handleDelete}
          handleLike={handleLike}
        />
      ) : (
        <section className="cards">
          <p className="cards__empty">Your feed is empty</p>
        </section>
      )}
    </>
  );
}
export default Posts
