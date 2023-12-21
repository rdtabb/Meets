import React from 'react'

import { box } from '@assets/index'

export const PostsEmpty = (): JSX.Element => (
    <section className="cards cards--empty">
        <div className="cards--empty__wrapper">
            <img src={box} alt="Your feed is empty!" className="cards--empty__img" />
            <h1 className="cards--empty__header">
                Whoopsies, the feed is empty! Click plus button to add post
            </h1>
        </div>
    </section>
)
