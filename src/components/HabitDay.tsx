import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';

interface HabitDayProps {
    completed: number;
    amount: number;
}

export function HabitDay(props: HabitDayProps) {

    const completPercentage = Math.round((props.completed / props.amount) * 100)

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx('w-10 h-10  border-2 rounded-lg', {
                'bg-zinc-900 border-zinc-800': completPercentage === 0,
                'bg-violet-900 boder-violet-700': completPercentage >= 0 && completPercentage < 20,
                'bg-violet-800 boder-violet-600': completPercentage >= 20 && completPercentage < 40,
                'bg-violet-700 boder-violet-600': completPercentage >= 40 && completPercentage < 60,
                'bg-violet-600 boder-violet-600': completPercentage >= 60 && completPercentage < 80,
                'bg-violet-500 boder-violet-400': completPercentage >= 80,
            })} />

            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
                    <span className='font-semibold text-zinc-400'>Terça-feira</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>17/01</span>

                    <ProgressBar progress={completPercentage} />
                    <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}