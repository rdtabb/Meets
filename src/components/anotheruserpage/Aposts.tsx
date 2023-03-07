import Afeed from "./Afeed"

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
        />
      ) : (
        <section>
            <p>there are no posts</p>
        </section>
      )}
    </>
  )
}

export default Aposts
