type PropsType = {
    username: string
}

const Heading = ({username}: PropsType) => {
  return (
    <h1 className="profile__header">{username}</h1>
  )
}

export default Heading
