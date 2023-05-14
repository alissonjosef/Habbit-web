import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";
import { Check } from "phosphor-react";
import dayjs from "dayjs";
import { HabitsList } from "./HabitsList";
import { useState } from "react";

interface HabitDayProps {
  date: Date;
  defaultcompleted?: number;
  amount?: number;
}

export function HabitDay({
  defaultcompleted = 0,
  amount = 0,
  date,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultcompleted);
  const completPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const fullAndMant = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  const today = dayjs().startOf("day").toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  function handleAmountCompletdChanger(comleted: number) {
    setCompleted(comleted);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx("w-10 h-10  border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background", {
          "bg-zinc-900 border-zinc-800": completPercentage === 0,
          "bg-violet-900 boder-violet-700":
            completPercentage >= 0 && completPercentage < 20,
          "bg-violet-800 boder-violet-600":
            completPercentage >= 20 && completPercentage < 40,
          "bg-violet-700 boder-violet-600":
            completPercentage >= 40 && completPercentage < 60,
          "bg-violet-600 boder-violet-600":
            completPercentage >= 60 && completPercentage < 80,
          "bg-violet-500 boder-violet-400": completPercentage >= 80,
          "border-white": isCurrentDay,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {fullAndMant}
          </span>

          <ProgressBar progress={completPercentage} />

          <HabitsList
            date={date}
            onCompletedChanger={handleAmountCompletdChanger}
          />
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
