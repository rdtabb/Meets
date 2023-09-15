import { db } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { Post } from "../types/Types";

type MutationFnType = {
  id: number;
  posts: Post[];
};

const uid = localStorage.getItem("uid")!;

export const handleLike = async (variables: MutationFnType): Promise<void> => {
  const newPosts: Post[] = variables.posts.map((post) =>
    post.id == variables.id ? { ...post, liked: !post.liked } : post,
  );
  const newpostsdb = {
    newPosts: newPosts,
  };
  const userdoc = doc(db, "users", `${uid}`);
  await updateDoc(userdoc, newpostsdb);
};

export const handleDelete = async (
  variables: MutationFnType,
): Promise<void> => {
  const newPosts = variables.posts.filter((post) => post.id != variables.id);
  const newpostsdb = {
    newPosts: newPosts,
  };
  const userdoc = doc(db, "users", uid);
  await updateDoc(userdoc, newpostsdb);
};
