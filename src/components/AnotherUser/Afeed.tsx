import { memo } from "react";
import { Post, LikePostMutation } from "../../types/Types";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModal from "../../hooks/useModal";

type AfeedProps = {
  posts: Post[];
  username?: string;
};

const Afeed = ({ posts, username }: AfeedProps) => {
  const queryClient = useQueryClient();
  const { openImagePopup } = useModal();

  const handleLikeQuery = async (props: LikePostMutation) => {
    const uid = localStorage.getItem("uid")!;
    const userdoc = doc(db, "users", uid);
    const dataSnap = await getDoc(userdoc);
    const dataset = dataSnap.data();
    const likedPosts = dataset?.liked;
    props.e.target.classList.remove("explosive");
    props.e.target.classList.add("explosive");
    const id = likedPosts.length ? likedPosts[0].id + 1 : 1;
    const post = {
      id,
      city: props.name,
      imgsrc: props.src,
      creator: username,
    };
    const newPosts = [post, ...likedPosts];
    const updateLiked = { liked: newPosts };
    await updateDoc(userdoc, updateLiked);
  };

  const likePostMutation = useMutation({
    mutationFn: handleLikeQuery,
    onSuccess: () => {
      queryClient.invalidateQueries(["userdataset"]);
    },
  });

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
            <button
              type="button"
              className="card__like card__like--auser"
              onClick={(e) =>
                likePostMutation.mutate({
                  e,
                  name: post.city,
                  src: post.imgsrc,
                  username,
                })
              }
            ></button>
          </div>
        </article>
      ))}
    </section>
  );
};

export default memo(Afeed);
