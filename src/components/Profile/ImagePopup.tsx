import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useGeneralContext from "../../hooks/useContextHooks/useGeneralContext";

import type { Comment, Post } from "../../types/Types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";

import format from "date-fns/format";

type AddCommentMutationProps = {
  comment: string;
};

type FormValues = {
  comment: string;
};

const ImagePopup = () => {
  const { handleComment, cuid } = useGeneralContext();
  const [currMessage, setCurrMessage] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const post: Post = location.state?.post;

  const { register, handleSubmit } = useForm<FormValues>({ mode: "onChange" });

  const fetchComments = async (): Promise<Comment[]> => {
    const userdoc = doc(db, "users", cuid);
    const dataSnap = await getDoc(userdoc);
    const dataset = dataSnap.data();
    const posts: Post[] = dataset?.newPosts;
    const commentPost = posts.find((postf) => postf.id == post.id)!;
    const comments: Comment[] = commentPost?.comments;
    return comments;
  };

  const addComment = async ({ comment: message }: AddCommentMutationProps) => {
    const userdoc = doc(db, "users", cuid);
    const dataSnap = await getDoc(userdoc);
    const dataset = dataSnap.data();
    const posts: Post[] = dataset?.newPosts;
    const creator = dataset?.name;

    const img = auth.currentUser?.photoURL!;
    const createdAt: string = `${format(new Date(), "MMMM dd, yyyy pp")}`;

    const commentPost = posts.find((postf) => postf.id == post.id)!;
    const comments: Comment[] = commentPost?.comments;

    const id: number = comments.length
      ? comments[comments.length - 1].id + 1
      : 1;
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

  const queryClient = useQueryClient();

  const commentsQuery = useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
  });

  const commentsMutation = useMutation({
    mutationFn: (data: AddCommentMutationProps) => addComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const closeImagePopupRoute = (e: any): void => {
    e.target.closest(".popup").setAttribute("data-visible", "false");
    setTimeout(() => {
      e.target.closest(".popup").classList.remove("popup_opened");
    }, 200);
    setTimeout(() => {
      navigate("/");
    }, 400);
  };

  useEffect(() => {
    commentsQuery.refetch();

    return () => {
      commentsQuery.remove();
    };
  }, []);

  return (
    <div data-visible="true" className="popup popup--image popup_opened">
      <div className="popup__container popup__container--image">
        <div className="popup--image__container">
          <img src={post?.imgsrc} alt="" className="popup__image" />
          <div className="textarea">
            <p className="popup__caption">{post?.city}</p>
            <ul className="comments">
              <CommentsSection comments={commentsQuery?.data} />
            </ul>
            <form
              onSubmit={() =>
                handleSubmit((data: FormValues) =>
                  commentsMutation.mutate(data),
                )
              }
            >
              <input
                {...register("comment")}
                placeholder="Leave your comment..."
                type="text"
                className="popup__comment"
              />
            </form>
          </div>
        </div>
        <button
          onClick={closeImagePopupRoute}
          type="button"
          className="popup__close popup__close--image"
        ></button>
      </div>
    </div>
  );
};

type CommentsSectionProps = {
  comments: Comment[] | undefined;
};

const CommentsSection = ({ comments }: CommentsSectionProps) => {
  return (
    <>
      {comments?.map((comment) => (
        <li key={comment.id} className="comment">
          <img className="comment__icon" src={comment.img} alt="" />
          <article>
            <div className="comment__info">
              <p className="comment__creator">{comment.creator}</p>
              <p className="comment__date">{comment.createdAt}</p>
            </div>
            <p className="comment__message">{comment.message}</p>
          </article>
        </li>
      ))}
    </>
  );
};

export default ImagePopup;
