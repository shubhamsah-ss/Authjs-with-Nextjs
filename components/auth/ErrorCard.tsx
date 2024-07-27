import { TriangleAlert } from 'lucide-react'
import Cardwrapper from '@/components/auth/Cardwrapper'

const ErrorCard = () => {
    return (
        <Cardwrapper
        headerLabel='Oops! Something went wrong!'
        backButtonHref='/auth/login'
        backButtonLabel='Back to login'
        >
            <div className="w-full flex items-center justify-center">
                <TriangleAlert className='text-destructive w-12 h-12' />
            </div>

        </Cardwrapper>
    )
}

export default ErrorCard