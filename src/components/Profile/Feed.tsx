import useGeneralContext from "../../hooks/useContextHooks/useGeneralContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setSelectedPost } from "../../features/modal/modalSlice";
import { handleLike, handleDelete } from "../../methods/methods";
import { Post } from "../../types/Types";
import React from "react";

type FeedProps = {
  posts: Post[];
};

const Feed = ({ posts }: FeedProps) => {
  const { openImagePopup } = useGeneralContext();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

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

  const handleImagePopup = (post: Post): void => {
    dispatch(setSelectedPost(post));
    openImagePopup(post.imgsrc, post.city, post.id, post.comments);
  };

  return (
    <section className="cards">
      {posts.map((post: Post) => (
        <article key={post.id} className="card">
          <div className="card__imgwrapper">
            <img
              onClick={() => handleImagePopup(post)}
              loading="lazy"
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
                  posts: posts,
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
                posts: posts,
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
