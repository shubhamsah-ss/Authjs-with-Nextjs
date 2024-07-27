"use client"

interface CardWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string
    backButtonHref: string,
    showSocial?: boolean
}

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Header from '@/components/auth/header'
import Social from '@/components/auth/social'
import { BackButton } from '@/components/auth/backbutton'

const Cardwrapper = ({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocial
}: CardWrapperProps) => {
    return (
        <Card className='sm:w-[480px] shadow-md'>
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
            {children}
            </CardContent>
            {
                showSocial && (
                    <CardFooter>
                        <Social />
                    </CardFooter>
                )
            }
            <CardFooter>
                <BackButton href={backButtonHref} label={backButtonLabel} />
            </CardFooter>
        </Card>
    )
}

export default Cardwrapper