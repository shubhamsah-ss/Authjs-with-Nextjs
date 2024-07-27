"use client"
import { newPassword } from '@/actions/new-password'
import Cardwrapper from '@/components/auth/Cardwrapper'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { NewPasswordSchema } from '@/schemas'
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"

const NewPasswordForm = () => {
    const searchParams = useSearchParams()

    const token = searchParams.get("token") as string

    const [isLoading, startLoading] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    })
    type ResetResponse = {
        error?: string;
        success?: string;
    };
    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("")
        setSuccess("")
        startLoading(() => {
            newPassword(values, token)
                .then((data: ResetResponse) => {
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }


    return (
        <Cardwrapper
            headerLabel='Enter a new password'
            backButtonHref='/auth/login'
            backButtonLabel="Back to login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className='space-y-4'>
                        <FormField control={form.control} name='password' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        type='password'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isLoading}
                        type='submit'
                        className='w-full'
                    >Reset password</Button>
                </form>
            </Form>
        </Cardwrapper>
    )
}

export default NewPasswordForm