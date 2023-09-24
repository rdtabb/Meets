import { memo, useCallback } from "react";
import { Post } from "../../types/Types";
import { handleUnlike, handleLike } from "../../methods/methods";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModal from "../../hooks/useModal";

type AfeedProps = {
  posts: Post[];
  username?: string;
  uid?: string;
};

const Afeed = ({ posts, uid: target_id }: AfeedProps) => {
  const queryClient = useQueryClient();
  const uid: string = localStorage.getItem("uid")!;
  const { openImagePopup } = useModal();

  const likeMutation = useMutation({
    mutationFn: handleLike,
    onSuccess: () => {
      queryClient.invalidateQueries(["auserdata"]);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: handleUnlike,
    onSuccess: () => {
      queryClient.invalidateQueries(["auserdata"]);
    },
  });

  const isLiked = useCallback(
    (post: Post) => {
      if (!post.likes.length) return false;

      return post.likes.some((like) => like.user_id === uid);
    },
    [likeMutation, unlikeMutation],
  );

  return (
    <section className="cards">
      {posts.map((post) => (
        <article key={post.id} className="card">
          <div className="card__imgwrapper">
            <img
              onClick={() => openImagePopup(post)}
              src={post.imgsrc}
              alt={post.city}
              className="card__image"
            ></img>
          </div>
          <div className="card__action">
            <h2 className="card__description">{post.city}</h2>
            <div className="card__like-count">
              <button
                type="button"
                className={isLiked(post) ? "card__like--active" : "card__like"}
                onClick={
                  isLiked(post)
                    ? () =>
                        unlikeMutation.mutate({
                          post_id: post.id,
                          user_id: target_id,
                          target_post: post,
                          posts,
                          like: {
                            user_id: uid,
                          },
                        })
                    : () =>
                        likeMutation.mutate({
                          post_id: post.id,
                          user_id: target_id,
                          target_post: post,
                          posts,
                          like: {
                            user_id: uid,
                          },
                        })
                }
              ></button>
              <p className="card__count">{post.likes.length}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default memo(Afeed);
