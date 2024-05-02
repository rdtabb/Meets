import { createFileRoute } from '@tanstack/react-router'

import { Userlist } from '@pages/index'

export const Route = createFileRoute('/usersearch')({
    component: Userlist
})
