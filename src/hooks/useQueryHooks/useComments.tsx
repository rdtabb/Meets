import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import type { CommentsQuery, Post } from "../../types/Types";
import { useQuery } from "@tanstack/react-query";

const useComments = (cuid: string, postId: number) => {
  const queryComments = async (props: CommentsQuery) => {
    const userdoc = doc(db, "users", props.cuid);
    const dataSnap = await getDoc(userdoc);
    const dataset = dataSnap.data();
    const posts: Post[] = dataset?.newPosts;

    const post = posts.find((postf) => postf.id == props.postId);
    return post?.comments;
  };
  return useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      queryComments({
        cuid,
        postId,
      }),
  });
};

export default useComments;
