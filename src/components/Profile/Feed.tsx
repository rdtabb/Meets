import useGeneralContext from "../../hooks/useContextHooks/useGeneralContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Post } from "../../types/Types";
import React from "react";

type FeedProps = {
  posts: Post[];
};

type MutationFnType = {
  id: number;
};

const Feed = ({ posts }: FeedProps) => {
  const { openImagePopup } = useGeneralContext();
  const uid = localStorage.getItem("uid")!;
  const queryClient = useQueryClient();

  const handleLike = async (variables: MutationFnType) => {
    const newPosts: Post[] = posts.map((post) =>
      post.id == variables.id ? { ...post, liked: !post.liked } : post,
    );
    const newpostsdb = {
      newPosts: newPosts,
    };
    const userdoc = doc(db, "users", `${uid}`);
    await updateDoc(userdoc, newpostsdb);
  };

  const handleDelete = async (variables: MutationFnType) => {
    const newPosts = posts.filter((post) => post.id != variables.id);
    const newpostsdb = {
      newPosts: newPosts,
    };
    const userdoc = doc(db, "users", uid);
    await updateDoc(userdoc, newpostsdb);
  };

  const likeMutation = useMutation({
    mutationFn: handleLike,
    onSuccess: () => {
      queryClient.invalidateQueries(["postsdata"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(["postsdata"]);
    },
  });

  return (
    <section className="cards">
      {posts.map((post: Post) => (
        <article key={post.id} className="card">
          <div className="card__imgwrapper">
            <img
              onClick={() =>
                openImagePopup(post.imgsrc, post.city, post.id, post.comments)
              }
              loading="eager"
              src={post.imgsrc}
              alt={post.city}
              className="card__image"
            ></img>
          </div>

          <div className="card__action">
            <h2 className="card__description">{post.city}</h2>
            <button
              onClick={() =>
                likeMutation.mutate({
                  id: post.id,
                })
              }
              type="button"
              className={post.liked ? "card__like--active" : "card__like"}
            ></button>
          </div>
          <button
            onClick={() =>
              deleteMutation.mutate({
                id: post.id,
              })
            }
            className="card__delete"
          ></button>
        </article>
      ))}
    </section>
  );
};

export default React.memo(Feed);
