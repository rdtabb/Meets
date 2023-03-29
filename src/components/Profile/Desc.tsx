import GeneralContext from "../../context/GeneralContext"
import { useContext } from "react"

type DescProps = {
  username: string
  userPicture: string
  handlePopup: any
  status: any
}

const Desc = ({username, userPicture, handlePopup, status}: DescProps) => {

  const { handleAddPostButton } = useContext(GeneralContext)

  return (
    <section className="profile">
        <div className="profile__wrapper">
            <img className="profile__avatar" src={userPicture} alt="Аватар пользователя"></img>
            <div className="profile__info">
                <div className="profile__info-wrapper">
                    <h1 className="profile__header">{username}</h1>
                    <button onClick={handlePopup} type="button" className="profile__edit-button"></button>
                </div>
                <p className="profile__description">{status}</p>
            </div>
        </div>
        <button onClick={handleAddPostButton} type="button" className="profile__add-button"></button>
    </section>
  )
}

export default Desc
