import React, { memo } from 'react'

import { Link } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'

import { meetsLogo, search, likeClrWhite, profile } from '@assets/index'
import { openPopupAtom } from '@features/index'

export const AppHeader = memo(() => {
    const setOpenPopup = useSetAtom(openPopupAtom)

    return (
        <header className="header header-profile">
            <img
                src={meetsLogo}
                alt="Meets-logo"
                className="header__logo"
                width={142}
                height={40}
            />
            <div className="header__routes">
                <Link
                    to="/"
                    activeProps={{
                        className: 'header__search--active'
                    }}
                    className="header__search"
                >
                    <img
                        className="header__icon"
                        src={profile}
                        alt="Go to your profile"
                        height={30}
                        width={30}
                    />
                </Link>
                <Link
                    activeProps={{
                        className: 'header__search--active'
                    }}
                    className="header__search"
                    to={'/usersearch'}
                >
                    <img
                        className="header__icon"
                        src={search}
                        alt="Go to search page"
                        height={30}
                        width={30}
                    />
                </Link>
                <Link
                    activeProps={{
                        className: 'header__search--active'
                    }}
                    className="header__search"
                    to={'/likedposts'}
                >
                    <img
                        className="header__liked-icon header__icon"
                        src={likeClrWhite}
                        alt="Go to page with liked posts"
                        height={30}
                        width={30}
                    />
                </Link>
                <button onClick={() => setOpenPopup('confirm')} className="signout" type="button">
                    Sign Out
                </button>
            </div>
        </header>
    )
})
