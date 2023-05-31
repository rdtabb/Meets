import { ReactElement } from "react";

export type ChildrenType = {
  children: ReactElement | ReactElement[];
};

export type LikedPost = {
  city: string;
  creator: string;
  id: number;
  imgsrc: string;
};

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
  uid: string;
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
