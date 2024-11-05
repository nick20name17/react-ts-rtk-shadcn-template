import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { DatePicker } from './date-picker'
import { ThemeSelect } from './theme-select'
import { Checkbox } from './ui/checkbox'
import { PasswordWithReveal } from './ui/password-with-reveal'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const contactSchema = z.object({
    username: z
        .string({
            required_error: 'Username is required.'
        })
        .min(2, {
            message: 'Username must be at least 2 characters.'
        }),
    theme: z.enum(['light', 'dark', 'system'], {
        required_error: 'Theme is required.'
    }),
    date: z.date({
        required_error: 'Date is required.'
    }),
    mobile: z.boolean().default(false).optional(),
    password: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим")
        .min(8, 'Пароль повинен містити не менше 8 символів')
        .regex(/[a-z]/, 'Пароль повинен містити не менше однієї малої літери')
        .regex(/[A-Z]/, 'Пароль повинен містити не менше однієї великої літери')
        .regex(/[0-9]/, 'Пароль повинен містити не менше однієї цифри')
        .regex(
            /[!@#$%^&*]/,
            'Пароль повинен містити не менше одного спеціального символу (!@#$%^&*)'
        )
})

type ContactFormData = z.infer<typeof contactSchema>

export const ContactForm = () => {
    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    })

    const onSubmit = (formData: ContactFormData) => {
        toast('Submitted!', {
            description: (
                <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                    <code className='text-white'>
                        {JSON.stringify(formData, null, 2)}
                    </code>
                </pre>
            )
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-[500px] space-y-8 rounded-lg border p-6'>
                <div className='flex items-start gap-x-4'>
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='shadcn'
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='theme'
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Theme</FormLabel>
                                <FormControl>
                                    <ThemeSelect
                                        onChange={field.onChange}
                                        theme={field.value}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name='date'
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-y-2'>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    date={field.value}
                                    setDate={field.onChange}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-y-2'>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordWithReveal {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='mobile'
                    render={({ field }) => (
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                                <FormLabel>
                                    Use different settings for my mobile devices
                                </FormLabel>
                                <FormDescription>
                                    You can manage your mobile notifications in the mobile
                                    settings page.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    )
}
