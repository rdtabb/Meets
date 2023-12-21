import React, { memo } from 'react'

import { NavLink } from 'react-router-dom'

import { meetsLogo, search, likeClrWhite, profile } from '@assets/index'
import { ROUTES } from '@constants/routes'

import { openPopup } from '../../utils/utils'

export const AppHeader = memo(() => (
    <header className="header header-profile">
        <img src={meetsLogo} alt="Meets-logo" className="header__logo" />
        <div className="header__routes">
            <NavLink
                className={({ isActive }) =>
                    isActive ? 'header__search--active' : 'header__search'
                }
                to={ROUTES.PROFILE}
            >
                <img className="header__icon" src={profile} alt="Go to your profile" />
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? 'header__search--active' : 'header__search'
                }
                to={ROUTES.USERSEARCH}
            >
                <img className="header__icon" src={search} alt="Go to search page" />
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
                />
            </NavLink>
            <button onClick={() => openPopup('confirm')} className="signout" type="button">
                Sign Out
            </button>
        </div>
    </header>
))
