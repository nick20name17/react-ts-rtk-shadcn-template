import { Loader2, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { useDeleteUserMutation } from '@/api/users/users'
import type { User } from '@/api/users/users.types'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'

interface RemoveUserModalProps {
    user: User
}

export const RemoveUserModal = ({ user }: RemoveUserModalProps) => {
    const [open, setOpen] = useState(false)

    const [deleteUser, { isLoading }] = useDeleteUserMutation()

    const handleUserDelete = async () => {
        try {
            await deleteUser(user.id)
                .unwrap()
                .then(() => {
                    toast.success(`User ${user.name} deleted successfully`)
                    setOpen(false)
                })
        } catch (err: any) {
            console.log(err)

            toast.error(err.data.message ? err.data.message : 'Something went wrong')
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    className='justify-start'
                    variant='ghost'
                    size='sm'
                >
                    <X className='mr-2 h-3.5 w-3.5' />
                    Remove
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete user
                        <span className='font-bold text-primary'> {user.name}</span> and
                        remove user data from our servers.
                    </DialogDescription>
                </DialogHeader>

                <div className='flex items-center justify-end gap-x-4'>
                    <Button
                        className='w-28'
                        onClick={handleUserDelete}
                        variant='destructive'
                    >
                        {isLoading ? <Loader2 className='size-4' /> : 'Delete user'}
                    </Button>
                    <Button
                        onClick={() => setOpen(false)}
                        variant='secondary'
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
