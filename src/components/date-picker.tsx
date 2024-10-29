import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import type { SelectSingleEventHandler } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DatePickerProps {
    date: Date
    setDate: SelectSingleEventHandler
}

export const DatePicker = ({ date, setDate }: DatePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                    )}>
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {date ? (
                        format(date, 'PPP', {
                            locale: uk
                        })
                    ) : (
                        <span>Оберіть дату</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <Calendar
                    locale={uk}
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
