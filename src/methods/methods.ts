import { db, auth } from "../firebase-config";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {
  Post,
  Comment,
  AddCommentMutationProps,
  DeletePostMutationProps,
  EditProfilePopupData,
  AddPostData,
  EditIconMutationProps,
} from "../types/Types";
import format from "date-fns/format";

/**
 * ID of the current user
 * */
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

export const handleNewPost = async (variables: AddPostData) => {
  const userdoc = doc(db, "users", uid);
  const dataSnap = await getDoc(userdoc);
  const dataset = dataSnap.data();
  const nposts = await dataset?.newPosts;

  const id = nposts.length ? nposts[0].id + 1 : 1;
  const newPost = {
    city: variables.place,
    id,
    imgsrc: variables.url,
    liked: false,
    comments: [],
  };
  const newPosts = [newPost, ...nposts];

  const newpostsdb = {
    newPosts: newPosts,
  };
  await updateDoc(userdoc, newpostsdb);
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

export const handleProfileIcon = async (variables: EditIconMutationProps) => {
  const uid = localStorage.getItem("uid")!;
  const userdoc = doc(db, "users", uid);
  const updatedImage = {
    imgurl: variables.url,
  };
  await updateDoc(userdoc, updatedImage);
};

export const handleAddComment = async ({
  comment: message,
  post,
  id: userid,
}: AddCommentMutationProps): Promise<void> => {
  const userdoc = doc(db, "users", userid);
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
  const updatedPosts = posts.map((npost) =>
    npost.id == post?.id ? { ...npost, comments: newComments } : npost,
  );
  const newpostsdb = {
    newPosts: updatedPosts,
  };
  await updateDoc(userdoc, newpostsdb);
};

export const fetchComments = async ({
  uid,
  post_id,
}: {
  uid: string | undefined;
  post_id: number | undefined;
}) => {
  if (!uid || !post_id)
    throw new Error("Provide correct uid and post_id to fetch comments");
  const userdoc = doc(db, "users", uid);
  const dataSnap = await getDoc(userdoc);
  const dataset = dataSnap.data();

  const posts: Post[] = dataset?.newPosts;
  const post = posts.find((post) => post.id === post_id);
  return post?.comments;
};

export const handleEditProfile = async (variables: EditProfilePopupData) => {
  const uid = localStorage.getItem("uid")!;
  const newstatusdb = {
    name: variables.username,
    newStatus: variables.status,
  };
  const userdoc = doc(db, "users", uid);
  await updateDoc(userdoc, newstatusdb);
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
