"use client"
import { useSearchParams } from 'next/navigation'
import Cardwrapper from './Cardwrapper'

import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useRef, useState } from 'react'
import { newVerification } from '@/actions/new-verification'
import { FormSuccess } from '../form-success'
import { FormError } from '../form-error'

const NewVerificationForm = () => {
    const searchParams = useSearchParams()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const token = searchParams.get("token")
    const hasSubmittedRef = useRef(false)

    const onSubmit = useCallback(() => {
        if (hasSubmittedRef.current || success || error) return
        hasSubmittedRef.current = true
        if (!token) {
            setError("missing token!")
            return
        }
        newVerification(token).then((data) => {
            if(data.success) {
                setSuccess(data.success)
                setError(undefined)
            }
            if (data.error) {
                setError(data.error)
                setSuccess(undefined)
            }
        }).catch(() => {
            setError("Something went wrong!")
        })
    }, [token, success, error])

    useEffect(() => {
        if(!success && !error) onSubmit()
    }, [onSubmit])

    return (
        <Cardwrapper
        headerLabel='Confirming your verification'
        backButtonHref='/auth/login'
        backButtonLabel='Back to login'
        >
            <div className='flex justify-center items-center w-full'>
                {
                    !success && !error && <BeatLoader />
                }
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </Cardwrapper>
    )
}

export default NewVerificationForm