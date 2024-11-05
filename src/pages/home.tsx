import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

export const HomePage = () => {
    const { scrollYProgress } = useScroll()

    return (
        <div className='min-h-[4000px]'>
            <motion.div
                className='fixed inset-x-0 top-[89px] h-2.5 origin-[0%] bg-primary'
                style={{ scaleX: scrollYProgress }}
            />
            <motion.h1
                initial={{ opacity: 0, scale: 0, transitionDuration: '0.5s' }}
                animate={{ opacity: 1, scale: 1, transitionDuration: '0.5s' }}
                className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                Home Page
            </motion.h1>
            <Demo />
            <section className='mt-10'>
                <TaskList />
            </section>
        </div>
    )
}

const Demo = () => {
    return <div></div>
}

const TaskList = () => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Task 1',
            status: 'done'
        },
        {
            id: 2,
            title: 'Task 2',
            status: 'pending'
        },
        {
            id: 3,
            title: 'Task 3',
            status: 'in-progress'
        }
    ])

    const handleRemoveTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    return (
        <ul className='mt-10 flex w-full flex-col gap-y-4'>
            <AnimatePresence
                initial={true}
                mode='popLayout'>
                {tasks.map((task) => (
                    <motion.li
                        transition={{
                            type: 'spring',
                            stiffness: 800,
                            damping: 30
                        }}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        key={task.id}
                        className='flex w-full justify-between gap-x-4 rounded-md border p-4'>
                        <div>
                            <h3 className='text-lg font-medium'>{task.title}</h3>
                            <p className='text-sm text-gray-500'>{task.status}</p>
                        </div>

                        <Button
                            onClick={() => handleRemoveTask(task.id)}
                            variant='destructive'
                            size='icon'>
                            <Trash2 />
                        </Button>
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    )
}
