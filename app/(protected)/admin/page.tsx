"use client"
import { admin } from '@/actions/admin'
import RoleGate from '@/components/auth/role-gate'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useCurrentRole } from '@/hooks/use-current-role'
import { UserRole } from '@prisma/client'
import React from 'react'
import { toast } from 'sonner'

const Admin = () => {

    const onApiRouteClick = () => {
        fetch("/api/admin")
        .then((response) => {
            if(response.ok){
                toast.success("ALLOWED API ROUTES!")
            } else {
                toast.error("FORBIDDEN API ROUTES!")
            }
        })
    }

    const onServerActionClick = () => {
        admin()
        .then((data) => {
            if(data.error) {
                toast.error(data.error)
            }

            if(data.success) {
                toast.success(data.success)
            }
        })
    }

    return (
        <Card className='w-[600px]'>
            <CardHeader>
                <p className='text-2xl font-semibold text-center'>
                    🔑 Admin
                </p>
            </CardHeader>
            <CardContent className='space-y-4'>
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message='You are allowed to see this content.' />
                </RoleGate>
                <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
                    <p className='text-sm font-medium'>
                        Admin-only API routes
                    </p>
                    <Button onClick={onApiRouteClick}>
                        Click to test
                    </Button>
                </div>

                <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
                    <p className='text-sm font-medium'>
                        Admin-only server actions
                    </p>
                    <Button onClick={onServerActionClick}>
                        Click to test
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default Admin