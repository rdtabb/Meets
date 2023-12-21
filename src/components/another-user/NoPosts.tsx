import React from 'react'

import { box } from '../../assets'

interface NoPostsProps {
    name: string | undefined
}

export const NoPosts = ({ name }: NoPostsProps): JSX.Element => (
    <section className="auser__noposts">
        <img src={box} alt="Posts section is empty" />
        <p>Oops, {name} has no posts!</p>
    </section>
)
