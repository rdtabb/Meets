import * as React from 'react'

import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons'

import { cn } from '@utils/utils'

import { Button } from './button'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false)

        const togglePasswordVisibility = React.useCallback((): void => {
            setIsPasswordVisible((prev) => !prev)
        }, [])

        return (
            <div className="relative">
                <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    className={cn(
                        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <Button
                    className="absolute right-0 top-0 p-2"
                    variant="ghost"
                    type="button"
                    onClick={togglePasswordVisibility}
                    disabled={!props.value}
                >
                    {isPasswordVisible ? <EyeNoneIcon /> : <EyeOpenIcon />}
                </Button>
            </div>
        )
    }
)
PasswordInput.displayName = 'PasswordInput '

export { Input, PasswordInput }
