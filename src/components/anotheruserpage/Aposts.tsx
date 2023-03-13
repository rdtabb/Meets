import Afeed from "./Afeed"
import NoPosts from "./NoPosts"

type apostsprops = {
    posts: any
    name: any
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
