import React, { memo, PropsWithChildren } from 'react'

interface ContainterProps extends PropsWithChildren {
    modifierClass?: string
}

export const Container = memo(({ children, modifierClass }: ContainterProps) => {
    return (
        <div className={`container ${modifierClass}`} data-kb-theme="dark">
            {children}
        </div>
    )
})
