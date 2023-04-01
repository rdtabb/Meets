type PropsType = {
  userPicture: string
}

const AvatarImage = ({userPicture}: PropsType) => {
  return (
    <img src={userPicture} alt="Avatar" className="profile__image" />
  )
}

export default AvatarImage
