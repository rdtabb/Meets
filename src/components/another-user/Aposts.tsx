import React from 'react'

import { Post } from '@constants/types'

import { Afeed } from './Afeed'
import { NoPosts } from './NoPosts'

interface APostsProps {
    posts?: Post[]
    name?: string
    uid?: string
}

export const Aposts = ({ posts, name, uid }: APostsProps): JSX.Element => (
    <>
        {posts?.length ? (
            <Afeed uid={uid} posts={posts} username={name} />
        ) : (
            <NoPosts name={name} />
        )}
    </>
)
