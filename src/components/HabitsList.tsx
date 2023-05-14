import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface HabitsListProps {
  date: Date;
  onCompletedChanger: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string;
}

export function HabitsList({ date, onCompletedChanger }: HabitsListProps) {
  const [habistInfo, setHabitInfo] = useState<HabitsInfo>();
  useEffect(() => {
    api
      .get("day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((res) => setHabitInfo(res.data));
  }, []);

  const inDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`);

    const isHabitAlreaduComplete =
      habistInfo!.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreaduComplete) {
      completedHabits = habistInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habistInfo!.completedHabits, habitId];
    }
    setHabitInfo({
      possibleHabits: habistInfo!.possibleHabits,
      completedHabits,
    });

    onCompletedChanger(completedHabits.length)
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habistInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            key={habit.id}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            checked={habistInfo.completedHabits.includes(habit.id)}
            disabled={inDateInPast}
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>
            <samp className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              {habit.title}
            </samp>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
