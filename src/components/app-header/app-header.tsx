import React, { memo } from 'react'

import { useSetAtom } from 'jotai'
import { NavLink } from 'react-router-dom'

import { meetsLogo, search, likeClrWhite, profile } from '@assets/index'
import { ROUTES } from '@constants/routes'
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
                <NavLink
                    className={({ isActive }) =>
                        isActive ? 'header__search--active' : 'header__search'
                    }
                    to={ROUTES.PROFILE}
                >
                    <img
                        className="header__icon"
                        src={profile}
                        alt="Go to your profile"
                        height={30}
                        width={30}
                    />
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? 'header__search--active' : 'header__search'
                    }
                    to={ROUTES.USERSEARCH}
                >
                    <img
                        className="header__icon"
                        src={search}
                        alt="Go to search page"
                        height={30}
                        width={30}
                    />
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? 'header__search--active' : 'header__search'
                    }
                    to={ROUTES.LIKEDPOSTS}
                >
                    <img
                        className="header__liked-icon header__icon"
                        src={likeClrWhite}
                        alt="Go to page with liked posts"
                        height={30}
                        width={30}
                    />
                </NavLink>
                <button onClick={() => setOpenPopup('confirm')} className="signout" type="button">
                    Sign Out
                </button>
            </div>
        </header>
    )
})
