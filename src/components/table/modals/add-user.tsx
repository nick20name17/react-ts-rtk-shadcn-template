import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z, type infer as zodInfer } from 'zod'

import { useAddUserMutation } from '@/api/users/users'
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

export const userAddSchema = z.object({
    name: z.string().min(2, {
        message: 'Username must be at least 2 characters.'
    }),
    email: z.string().email().min(2, {
        message: 'Username must be at least 2 characters.'
    }),
    password: z.string().min(2, {
        message: 'Username must be at least 2 characters.'
    })
})

type AddFormValues = zodInfer<typeof userAddSchema>

export const AddUserModal = () => {
    const form = useForm<AddFormValues>({
        resolver: zodResolver(userAddSchema),
        defaultValues: {
            email: '',
            name: '',
            password: ''
        }
    })

    const [open, setOpen] = useState(false)

    const [addUser, { isLoading }] = useAddUserMutation()

    const handleUserDelete = async (data: AddFormValues) => {
        try {
            await addUser(data)
                .unwrap()
                .then(() => {
                    toast.success(`User added successfully`)
                    setOpen(false)
                })
        } catch (err: any) {
            toast.error(err.data.message ? err.data.message : 'Something went wrong')
        }
    }

    const onSubmit = (formData: AddFormValues) => {
        handleUserDelete(formData)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='w-40'>
                    <UserRound className='mr-2 size-3.5' />
                    Add user
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add user</DialogTitle>
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

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='as3344dg5@g'
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
