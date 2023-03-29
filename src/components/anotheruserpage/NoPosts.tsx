type PropsType = {
  name: string | undefined
}

const NoPosts = ({name}: PropsType) => {
  return (
    <section className="auser__noposts">
      <img src="src/assets/box.svg" alt="" />
      <p>Oops, {name} has no posts!</p>
    </section>
  )
}

export default NoPosts
