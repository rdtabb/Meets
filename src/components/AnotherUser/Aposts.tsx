import Afeed from "./Afeed";
import NoPosts from "./NoPosts";
import type { Post } from "../../types/Types";

type apostsprops = {
  posts: Post[];
  name: string | undefined;
};

const Aposts = ({ posts, name }: apostsprops) => {
  return (
    <>
      {posts.length ? (
        <Afeed posts={posts} username={name} />
      ) : (
        <NoPosts name={name} />
      )}
    </>
  );
};

export default Aposts;
