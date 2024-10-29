import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { routes } from './config/routes'
import { Layout } from './layout'
import { CounterPage } from './pages/counter'
import { ErrorPage } from './pages/error'
import { FormPage } from './pages/form'
import { TablePage } from './pages/table'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: routes.main,
                element: <FormPage />
            },
            {
                path: routes.table,
                element: <TablePage />
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
