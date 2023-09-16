import { db, auth } from "../firebase-config";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {
  Post,
  Comment,
  AddCommentMutationProps,
  DeletePostMutationProps,
} from "../types/Types";
import format from "date-fns/format";

const uid = localStorage.getItem("uid")!;

export const handleLike = async (
  variables: DeletePostMutationProps,
): Promise<void> => {
  const newPosts: Post[] = variables.posts.map((post) =>
    post.id == variables.id ? { ...post, liked: !post.liked } : post,
  );
  const newpostsdb = {
    newPosts: newPosts,
  };
  const userdoc = doc(db, "users", `${uid}`);
  await updateDoc(userdoc, newpostsdb);
};

export const handleUserDataset = async () => {
  const userdoc = doc(db, "users", uid);
  const dataSnap = await getDoc(userdoc);
  return dataSnap.data();
};

export const handleDelete = async (
  variables: DeletePostMutationProps,
): Promise<void> => {
  const newPosts = variables.posts.filter((post) => post.id != variables.id);
  const newpostsdb = {
    newPosts: newPosts,
  };
  const userdoc = doc(db, "users", uid);
  await updateDoc(userdoc, newpostsdb);
};

export const handleAddComment = async ({
  comment: message,
  post,
}: AddCommentMutationProps): Promise<void> => {
  const userdoc = doc(db, "users", uid);
  const dataSnap = await getDoc(userdoc);
  const dataset = dataSnap.data();
  const posts: Post[] = dataset?.newPosts;
  const creator = dataset?.name;

  const img = auth.currentUser?.photoURL!;
  const createdAt: string = `${format(new Date(), "MMMM dd, yyyy pp")}`;

  const commentPost = posts.find((postf) => postf.id == post?.id)!;
  const comments: Comment[] = commentPost?.comments;

  const id: number = comments.length ? comments[comments.length - 1].id + 1 : 1;
  const newcomment: Comment = {
    creator,
    message,
    createdAt,
    id,
    img,
  };
  const newComments = [...comments, newcomment];

  const updatedPosts = posts.map((post) =>
    post.id == post.id ? { ...post, comments: newComments } : post,
  );
  const newpostsdb = {
    newPosts: updatedPosts,
  };
  await updateDoc(userdoc, newpostsdb);
};

export const handlePopup = (
  popup: HTMLDivElement,
  operation: "open" | "close",
): Promise<unknown> | undefined => {
  if (operation === "close") {
    popup.setAttribute("data-visible", "false");
    return new Promise((res) =>
      setTimeout(() => {
        popup.classList.remove("popup_opened");
        res(200);
      }, 200),
    );
  } else {
    popup.setAttribute("data-visible", "true");
    popup.classList.add("popup_opened");
  }
};
