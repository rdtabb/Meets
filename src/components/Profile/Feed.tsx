import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setSelectedPost,
  setOpenPopupType,
} from "../../features/modal/modalSlice";
import { handleLike, handleDelete, handleUnlike } from "../../methods/methods";
import { Post } from "../../types/Types";
import { memo, useCallback } from "react";

type FeedProps = {
  posts: Post[];
};

const Feed = ({ posts }: FeedProps) => {
  const uid: string = localStorage.getItem("uid")!;
  const queryClient = useQueryClient();
  const selectedPost = useSelector(
    (state: RootState) => state.modal.selectedPost,
  );
  const dispatch = useDispatch();

  const likeMutation = useMutation({
    mutationFn: handleLike,
    onSuccess: () => {
      queryClient.invalidateQueries(["postsdata"]);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: handleUnlike,
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
    dispatch(setOpenPopupType("image"));

    if (selectedPost?.id !== post.id) dispatch(setSelectedPost(post));
  };

  const isLiked = useCallback(
    (post: Post) => {
      if (!post.likes.length) return false;
      return post.likes.some((like) => like.user_id === uid);
    },
    [likeMutation, unlikeMutation],
  );

  return (
    <section className="cards">
      {posts.map((post: Post) => (
        <article key={post.id} className="card">
          <div className="card__imgwrapper">
            <img
              onClick={() => handleImagePopup(post)}
              src={post.imgsrc}
              alt={post.city}
              className="card__image"
            ></img>
          </div>

          <div className="card__action">
            <h2 className="card__description">{post.city}</h2>
            <div className="card__like-count">
              <button
                name="likePostButton"
                type="button"
                className={isLiked(post) ? "card__like--active" : "card__like"}
                onClick={
                  isLiked(post)
                    ? () =>
                        unlikeMutation.mutate({
                          post_id: post.id,
                          user_id: uid,
                          target_post: post,
                          posts,
                          like: {
                            user_id: uid,
                          },
                        })
                    : () =>
                        likeMutation.mutate({
                          post_id: post.id,
                          user_id: uid,
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
          <button
            name="deletePostButton"
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

export default memo(Feed);
