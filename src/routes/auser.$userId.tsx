import { createFileRoute } from '@tanstack/react-router'

import { Auser } from '@pages/index'

export const Route = createFileRoute('/auser/$userId')({
    component: Auser
})
