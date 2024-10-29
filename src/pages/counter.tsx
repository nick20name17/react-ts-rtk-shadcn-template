import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { decrement, increment } from '@/store/slices/counter'

export const CounterPage = () => {
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()

    return (
        <>
            <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                Counter
            </h1>
            <section className='mt-10'>
                <div className='flex items-center gap-x-10'>
                    <Button
                        aria-label='Increment value'
                        onClick={() => dispatch(increment())}>
                        <Plus />
                        Increment
                    </Button>
                    <div className='flex size-10 items-center justify-center rounded-lg border'>
                        {count}
                    </div>
                    <Button
                        aria-label='Decrement value'
                        onClick={() => dispatch(decrement())}>
                        <Minus />
                        Decrement
                    </Button>
                </div>
            </section>
        </>
    )
}
