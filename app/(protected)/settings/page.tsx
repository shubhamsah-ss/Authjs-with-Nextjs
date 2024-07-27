"use client"
import { settings } from '@/actions/settings'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useCurrentUser } from '@/hooks/use-current-user'
import { SettingSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRole } from '@prisma/client'
import { Settings as SettingsIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const SettingsPage = () => {

    const {status} = useSession()

    if(status === "loading") return <p>Loading...</p>
    if(status === "unauthenticated") {
        window.location.reload()
        return <p>Server error reloading...</p>
    }

    const user = useCurrentUser()

    const [isPending, startTransition] = useTransition()
    const { update } = useSession()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")


    const form = useForm<z.infer<typeof SettingSchema>>({
        resolver: zodResolver(SettingSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
        }
    })

    const onSubmit = (values: z.infer<typeof SettingSchema>) => {
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.success) {
                        setSuccess(data.success)
                        setError("")
                        update()
                    }
                    if (data.error) {
                        setError(data.error)
                        setSuccess("")
                    }
                })
        })
    }

    return (
        <Card className='w-[600px]'>
            <CardHeader>
                <p className='text-2xl font-semibold text-center flex items-center justify-center'>
                    <SettingsIcon className='w-4 h-4 mr-2' /> Settings
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='space-y-4'>

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {user?.isOAuth === false && <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='email'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />}

                            {user?.isOAuth === false && <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='password'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />}

                            {user?.isOAuth === false && <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='password'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />}

                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                                                <SelectItem value={UserRole.USER}>User</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {user?.isOAuth === false && <FormField
                                control={form.control}
                                name="isTwoFactorEnabled"
                                render={({ field }) => (
                                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                        <div className='space-y-0.5'>
                                            <FormLabel>Two Factor Authentication</FormLabel>
                                            <FormDescription>
                                                Enable two factor authentication for your account
                                            </FormDescription>
                                        </div>
                                        <Switch
                                            disabled={isPending}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormItem>
                                )}
                            />}

                        </div>

                        <FormError message={error} />
                        <FormSuccess message={success} />

                        <Button disabled={isPending} type='submit'>
                            Save
                        </Button>

                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SettingsPage