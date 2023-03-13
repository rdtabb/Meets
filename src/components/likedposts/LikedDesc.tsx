type PropsType = {
    username: string,
    status: string,
    userPicture: string
}

const LikedDesc = ({userPicture, username, status}: PropsType) => {
  return (
    <section className="profile">
        <div className="profile__wrapper">
            <img className="profile__avatar" src={userPicture} alt="Аватар пользователя"></img>
            <div className="profile__info">
                <div className="profile__info-wrapper">
                    <h1 className="profile__header">{username}</h1>
                </div>
                <p className="profile__description">{status}</p>
            </div>
        </div>
    </section>
  )
}

export default LikedDesc
