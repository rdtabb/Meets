import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useForm } from 'react-hook-form'

import { useToast } from '@components/ui/useToast'
import {
    Input,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Button
} from '@ui/index'

import { auth } from '../../../firebase-config'

import { FormValues, authFormSchema } from './form-schema'

export const LoginForm = () => {
    const { toast } = useToast()

    const form = useForm<FormValues>({
        resolver: zodResolver(authFormSchema)
    })

    const login = useCallback(
        async (values: FormValues) => {
            const result = await signInWithEmailAndPassword(auth, values.email, values.password)
            console.log(result)
            toast({
                title: 'You have logged in',
                description: `Your email: ${values.email}`
            })
            console.log(values)
        },
        [toast]
    )

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(login)} className="grid gap-2">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email: </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter email..."
                                    {...field}
                                    className="bg-black"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password: </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter password..."
                                    {...field}
                                    className="bg-black"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant="secondary" className="w-min mt-2">
                    Login
                </Button>
            </form>
        </Form>
    )
}
