import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { Header } from './components/header'
import { ErrorPage } from './pages/error'
import { MetaHead } from '@/components/meta-head'
import { Toaster } from '@/components/ui/sonner'

export const Layout = () => {
    return (
        <>
            <MetaHead />
            <Header />
            <main className='mt-24 flex flex-col items-center justify-center'>
                <ErrorBoundary fallback={<ErrorPage />}>
                    <Outlet />
                </ErrorBoundary>
            </main>
            <Toaster
                richColors
                duration={5000}
            />
        </>
    )
}
