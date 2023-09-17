import { ReactElement } from "react";
import { FieldValue } from "firebase/firestore";

export type AddCommentMutationProps = {
  comment: string;
  post?: Post;
};

export type DeletePostMutationProps = {
  id: number;
  posts: Post[];
};

export type EditIconMutationProps = {
  url: string;
};

export type AddPostData = {
  url: string;
  place: string;
};

export type ChildrenType = {
  children: ReactElement | ReactElement[];
};

export type EditProfilePopupData = {
  username: string;
  status: string;
};

export type LikedPost = {
  city: string;
  creator: string;
  id: number;
  imgsrc: string;
};

export interface IHandleSubmitMessageParams {
  e: React.FormEvent<HTMLFormElement>;
  creator: string;
  image: string | null | undefined;
  message: string;
  timestamp: FieldValue;
  userpair: string;
}

export type Comment = {
  creator: string;
  message: string;
  createdAt: string;
  id: number;
  img: string;
};

export type Post = {
  city: string;
  id: number;
  imgsrc: string;
  liked: boolean;
  comments: Comment[];
};

export type CommentsQuery = {
  cuid: string;
  postId: number;
};

export type DeleteLikedMutation = {
  id: number;
};

export type LikePostMutation = {
  e: any;
  name: string;
  src: string;
  username: string | undefined;
};

export type SnapType = {
  creator: string;
  displayDate: string;
  image: string;
  message: string;
  timestamp: object;
  userpair: string;
  id: string;
};
