import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '../data-table-column-header'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

import { ActionCell } from './cells/actions'
import type { User } from '@/api/users/users.types'
import { cn } from '@/lib/utils'

const roleColors = {
    customer: 'bg-blue-500',
    admin: 'bg-primary'
} as const

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'avatar',
        header: 'Avatar',
        cell: ({ row }) => (
            <Avatar>
                <AvatarImage src={row.original.avatar} />
                <AvatarFallback>
                    {row.original.name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
        )
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Name'
            />
        )
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Email'
            />
        )
    },
    {
        accessorKey: 'role',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title='Role'
            />
        ),
        cell: ({ row }) => (
            <div
                className={cn(
                    'w-fit rounded-full px-2.5 py-1 text-xs text-background',
                    roleColors[row.original.role]
                )}>
                {row.original.role}
            </div>
        )
    },
    {
        id: 'actions',
        cell: ({ row }) => <ActionCell user={row.original} />
    }
]
