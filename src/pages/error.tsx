import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { routes } from '@/config/routes'

export const ErrorPage = () => {
    return (
        <>
            <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                Something went wrong
            </h1>

            <Button
                className='mt-10'
                asChild>
                <Link to={routes.home}>Go to Home</Link>
            </Button>
        </>
    )
}
