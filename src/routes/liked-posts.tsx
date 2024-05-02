import { createLazyFileRoute } from '@tanstack/react-router'

import { LikedPosts } from '@pages/index'

export const Route = createLazyFileRoute('/liked-posts')({
    component: LikedPosts
})
