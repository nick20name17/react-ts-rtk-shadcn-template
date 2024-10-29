import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Pencil } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z, type infer as zodInfer } from 'zod'

import { usePatchUserMutation } from '@/api/users/users'
import type { User } from '@/api/users/users.types'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const userEditSchema = z.object({
    name: z.string().min(2, {
        message: 'Username must be at least 2 characters.'
    }),
    email: z.string().email().min(2, {
        message: 'Username must be at least 2 characters.'
    })
})

interface EditUserModalProps {
    user: User
}

type EditFormValues = zodInfer<typeof userEditSchema>

export const EditUserModal = ({ user }: EditUserModalProps) => {
    const form = useForm<EditFormValues>({
        resolver: zodResolver(userEditSchema),
        defaultValues: {
            email: user.email,
            name: user.name
        }
    })

    const [open, setOpen] = useState(false)

    const [patchUser, { isLoading }] = usePatchUserMutation()

    const handleUserDelete = async (data: EditFormValues) => {
        try {
            await patchUser({
                data,
                id: user.id
            })
                .unwrap()
                .then(() => {
                    toast.success(`User ${user.name} updated successfully`)
                    setOpen(false)
                })
        } catch (err: any) {
            console.log(err)

            toast.error(err.data.message ? err.data.message : 'Something went wrong')
        }
    }

    const onSubmit = (formData: EditFormValues) => {
        handleUserDelete(formData)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className='justify-start'
                    variant='ghost'
                    size='sm'>
                    <Pencil className='mr-2 size-3.5' />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit user{' '}
                        <span className='font-bold text-primary'> {user.name}</span>{' '}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className='space-y-5'
                        onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            placeholder='nickname@gmail.com'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='John'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex items-center justify-end gap-x-4'>
                            <Button
                                disabled={isLoading}
                                type='submit'
                                className='w-28'>
                                {isLoading ? <Loader2 className='size-4' /> : 'Edit user'}
                            </Button>
                            <Button
                                type='button'
                                onClick={() => setOpen(false)}
                                variant='secondary'>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
