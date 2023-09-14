import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import type { Post } from "../../types/Types";
import Feed from "./Feed";
import Loading from "../LoadingStates/LoadingPosts";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useQuery } from "@tanstack/react-query";

const uid: any = localStorage.getItem("uid");
const getPosts = async (): Promise<Post[]> => {
  const userdoc = doc(db, "users", uid);
  const dataSnap = await getDoc(userdoc);
  const dataset = dataSnap.data();
  const posts: Post[] = await dataset?.newPosts;
  return posts;
};

const Posts = () => {
  const postsQuery = useQuery({
    queryKey: ["postsdata"],
    queryFn: getPosts,
  });

  if (postsQuery.isLoading) return <Loading />;

  return (
    <>
      {postsQuery.data?.length ? (
        <ErrorBoundary>
          <Feed posts={postsQuery.data} />
        </ErrorBoundary>
      ) : (
        <section className="cards cards--empty">
          <div className="cards--empty__wrapper">
            <img
              src="src/assets/box.svg"
              alt=""
              className="cards--empty__img"
            />
            <h1 className="cards--empty__header">
              Whoopsies, your feed is empty! Click plus button to add post
            </h1>
          </div>
        </section>
      )}
    </>
  );
};
export default React.memo(Posts);
