import { Loader2 } from 'lucide-react'
import { Suspense, lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { routes } from './config/routes'
import { Layout } from './layout'
import { CounterPage } from './pages/counter'
import { ErrorPage } from './pages/error'
import { HomePage } from './pages/home'

const TablePage = lazy(() => import('./pages/table'))
const FormPage = lazy(() => import('./pages/form'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: routes.form,
                element: (
                    <Suspense
                        fallback={
                            <Loader2 className='fixed left-1/2 top-1/2 -translate-x-1/2' />
                        }>
                        <FormPage />
                    </Suspense>
                )
            },
            {
                path: routes.table,
                element: (
                    <Suspense
                        fallback={
                            <Loader2 className='fixed left-1/2 top-1/2 -translate-x-1/2' />
                        }>
                        <TablePage />
                    </Suspense>
                )
            },
            {
                path: routes.counter,
                element: <CounterPage />
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage />
    }
])

export const App = () => <RouterProvider router={router} />
