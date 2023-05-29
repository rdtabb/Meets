import { ReactElement } from "react";

export type ChildrenType = {
  children: ReactElement | ReactElement[];
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
