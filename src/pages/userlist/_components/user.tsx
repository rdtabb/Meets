import React, { memo } from 'react'

import { Link } from 'react-router-dom'

import { profile, chat } from '@assets/index'
import { Image } from '@components/index'
import { ROUTES } from '@constants/index'

interface User {
    imgurl: string
    id: string
    name: string
    newStatus: string
}

type UserProps = {
    user: User
}

export const User = memo(({ user }: UserProps) => (
    <li className="user">
        <div className="user__wrapper">
            <Image
                className="user__picture"
                classWhenError="user__picture--error"
                classWhenLoading="user__picture--loading"
                src={user.imgurl}
                alt={user.name}
                width={'88px'}
                height={'88px'}
            />
            <article className="user__desc">
                <p className="user__heading">{user.name}</p>
                <p className="user__status">{user.newStatus}</p>
            </article>
        </div>
        <div className="user__icons">
            <Link to={ROUTES.CHAT} state={{ name: user.name }}>
                <img className="user__chat" src={chat} alt={`Chat with ${user.name}`} />
            </Link>
            <Link to={`/user/${user.id}`}>
                <img className="user__icon" src={profile} alt={`${user.name}`} />
            </Link>
        </div>
    </li>
))
