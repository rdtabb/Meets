import Afeed from "./Afeed"
import NoPosts from "./NoPosts"
import { newPostsType } from "../../context/GeneralContext"

type apostsprops = {
  posts: Array<newPostsType>,
  name: string | undefined
}

const Aposts = ({ posts, name }: apostsprops) => {
  return (
    <>
      {posts.length ? (
        <Afeed 
         posts={posts}
         username={name}
        />
      ) : (
        <NoPosts 
          name={name}
        />
      )}
    </>
  )
}

export default Aposts
