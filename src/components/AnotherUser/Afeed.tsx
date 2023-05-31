import type { Post, LikePostMutation } from "../../types/Types";
import useGeneralContext from "../../hooks/useContextHooks/useGeneralContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type afeedprops = {
  posts: Post[];
  username: string | undefined;
};

const Afeed = ({ posts, username }: afeedprops) => {
  const { openImagePopup } = useGeneralContext();
  const queryClient = useQueryClient();

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
              onClick={() =>
                openImagePopup(post.imgsrc, post.city, post.id, post.comments)
              }
              src={post.imgsrc}
              alt={post.city}
              className="card__image"
            ></img>
          </div>
          <div className="card__action">
            <h2 className="card__description">{post.city}</h2>
            <button
              type="button"
              style={
                post.liked
                  ? {
                      backgroundImage: "url(../../../public/like-activep.svg)",
                    }
                  : {
                      backgroundImage: "url(../../../public/likep.svg)",
                    }
              }
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

export default Afeed;
