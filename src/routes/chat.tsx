import { createFileRoute } from '@tanstack/react-router'

import { Chat } from '@pages/index'

export const Route = createFileRoute('/chat')({
    component: Chat,
})
