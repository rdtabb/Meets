type PropsType = {
    name: string
}

const NoPosts = ({name}: PropsType) => {
  return (
    <section>
        <p>Oops, {name} has no posts!</p>
    </section>
  )
}

export default NoPosts
