import React from 'react'

type DescProps = {
    username: string,
    userPicture: string
  }

const Desc = ({username, userPicture}: DescProps) => {
  return (
    <section className="profile">
        <div className="profile__wrapper">
            <img className="profile__avatar" src={userPicture} alt="Аватар пользователя"></img>
            <div className="profile__info">
                <div className="profile__info-wrapper">
                    <h1 className="profile__header">{username}</h1>
                    <button type="button" className="profile__edit-button"></button>
                </div>
                <p className="profile__description">Исследователь океана</p>
            </div>
        </div>
        <button type="button" className="profile__add-button"></button>
    </section>
  )
}

export default Desc
