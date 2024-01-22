import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { UserlistLoading, User } from '@components/userlist'
import { QueryKeys } from '@constants/queryKeys'
import { getUsers } from '@methods/index'

export const Userlist = (): JSX.Element => {
    const { data: users, isLoading } = useQuery({
        queryFn: getUsers,
        queryKey: [QueryKeys.USERLIST],
        staleTime: Infinity,
        refetchOnWindowFocus: false
    })

    return (
        <main className="search">
            <ul className="search__userlist">
                {isLoading ? (
                    <UserlistLoading />
                ) : (
                    users?.map((user) => <User key={user.id} user={user} />)
                )}
            </ul>
        </main>
    )
}

export default Userlist
