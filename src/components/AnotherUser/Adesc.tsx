type adescprops = {
    name: any
    status: any
    url: any
}

const Adesc = ({ name, status, url }: adescprops) => {
  return (
    <section className="profile">
        <div className="profile__wrapper">
            <img className="profile__avatar" src={url} alt="Аватар пользователя"></img>
            <div className="profile__info">
                <div className="profile__info-wrapper">
                    <h1 className="profile__header">{name}</h1>
                </div>
                <p className="profile__description">{status}</p>
            </div>
        </div>
    </section>
  )
}

export default Adesc
