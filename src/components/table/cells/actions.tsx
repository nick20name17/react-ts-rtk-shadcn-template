import { MoreHorizontal } from 'lucide-react'

import { EditUserModal } from '../modals/edit-user'
import { RemoveUserModal } from '../modals/remove-user'

import type { User } from '@/api/users/users.types'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface ActionCellProps {
    user: User
}
export const ActionCell = ({ user }: ActionCellProps) => {
    return (
        <div className='flex w-full items-center justify-center'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='ghost'
                        size='icon'>
                        <MoreHorizontal className='size-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='flex flex-col'>
                    <DropdownMenuItem asChild>
                        <RemoveUserModal user={user} />
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <EditUserModal user={user} />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
