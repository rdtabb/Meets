import React from 'react'

const Posts = () => {
  const posts = [
    {
        imgsrc: "../../assets/lisboa.avif",
        city: "Lisboa",
        id: 1
    },
    {
        imgsrc: "../../assets/tokyo.avif",
        city: "Tokyo",
        id: 2
    },
    {
        imgsrc: "",
        city: "Chicago",
        id: 3
    },
    {
        imgsrc: "../../assets/fortaleza.avif",
        city: "Fortaleza",
        id: 4
    },
    {
        imgsrc: "../../assets/istanbul.avif",
        city: "Istanbul",
        id: 5
    },
    {
        imgsrc: "../../assets/bali.avif",
        city: "Bali",
        id: 6
    }
  ]


  return (
    <section className="cards">
        {posts.map((post) => (
            <article key={post.id} className="card">
                <img src={post.imgsrc} alt="" className="card__image" />
                <div className="card__action">
                    <h2 className="card__description">{post.city}</h2>
                    <button type="button" className="card__like"></button>
                </div>
                <img src="" alt="" />
            </article>
        ))}
    </section>
  )
}

export default Posts
