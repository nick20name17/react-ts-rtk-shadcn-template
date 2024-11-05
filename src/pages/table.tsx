import { useState } from 'react'

import { useGetUsersQuery } from '@/api/users/users'
import { Pagination, RowsPerPage } from '@/components/pagination'
import { SearchBar } from '@/components/search-bar'
import { columns } from '@/components/table/columns'
import { AddUserModal } from '@/components/table/modals/add-user'
import { DataTable } from '@/components/table/table'
import { Skeleton } from '@/components/ui/skeleton'

const TablePage = () => {
    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(10)

    const { data: users, isLoading } = useGetUsersQuery({
        limit,
        search: search.trim()
    })

    return (
        <>
            <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                Table
            </h1>
            <section className='mt-10 w-1/2'>
                <div className='flex items-center justify-between gap-x-10 p-1'>
                    <AddUserModal />
                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        type='search'
                        placeholder='Search...'
                    />
                </div>
                <div className='mt-2 h-[440px] w-full overflow-auto'>
                    {isLoading ? (
                        <TableSkeleton />
                    ) : (
                        <DataTable
                            columns={columns}
                            data={users || []}
                        />
                    )}
                </div>
                <div className='flex items-center justify-between gap-x-10 p-1'>
                    <RowsPerPage
                        pageSize={limit}
                        setPageSize={setLimit}
                    />
                    <Pagination count={100} />
                </div>
            </section>
        </>
    )
}

const TableSkeleton = () => {
    return (
        <div className='flex w-full flex-col gap-y-4 rounded-md border p-2'>
            <Skeleton className='h-10 w-full' />
            {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                    className='h-14 w-full'
                    key={index}
                />
            ))}
        </div>
    )
}

export default TablePage
