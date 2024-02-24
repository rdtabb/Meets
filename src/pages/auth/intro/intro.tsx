import React from 'react'

export const Intro = () => (
    <section className="intro">
        <h1 className="intro__title">Meets network</h1>
        <p className="intro__description">
            Meets is a social network for creating and sharing photos-related content. Users are
            able to create and share posts with their favourite photos, as well as interact with
            other users by commenting and liking posts.
        </p>
        <p className="intro__description intro__description--links">
            Developed by{' '}
            <a href="https://github.com/rdtabb" target="_blank" rel="noreferrer">
                rdtabb
            </a>{' '}
            Code on{' '}
            <a href="https://github.com/rdtabb/Meets" target="_blank" rel="noreferrer">
                Github
            </a>
        </p>
    </section>
)
