import Afeed from "./Afeed";
import NoPosts from "./NoPosts";
import type { Post } from "../../types/Types";

type APostsProps = {
  posts: Post[];
  name?: string;
  uid?: string;
};

const Aposts = ({ posts, name, uid }: APostsProps) => {
  return (
    <>
      {posts.length ? (
        <Afeed uid={uid} posts={posts} username={name} />
      ) : (
        <NoPosts name={name} />
      )}
    </>
  );
};

export default Aposts;
