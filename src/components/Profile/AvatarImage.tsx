import { useContext } from "react"
import GeneralContext from "../../context/GeneralContext"

type PropsType = {
  userPicture: string
}

const AvatarImage = ({userPicture}: PropsType) => {
  const { handleIconPopup } = useContext(GeneralContext)

  return (
    <img onClick={handleIconPopup} src={userPicture} alt="Avatar" className="profile__avatar" />
  )
}

export default AvatarImage
