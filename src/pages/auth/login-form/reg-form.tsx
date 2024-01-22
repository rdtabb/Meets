import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useForm } from 'react-hook-form'

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

export const RegisterForm = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(authFormSchema)
    })

    const register = useCallback(async ({ email, password }: FormValues): Promise<void> => {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        console.log(result)
    }, [])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(register)} className="grid gap-2">
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
                                    type="password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    variant="secondary"
                    className="w-min mt-2"
                    disabled={form.formState.isSubmitting}
                >
                    Register
                </Button>
            </form>
        </Form>
    )
}
