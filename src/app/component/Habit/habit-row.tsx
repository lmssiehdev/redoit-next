"use client";

import { FireIcon } from "@/components/icons";
import { useHabitStore } from "@/store/habits";
import type { Habit } from "@/types/habit-types";
import { summary } from "@/utils/calculate-streaks";
import dayjs from "dayjs";
import { useMemo } from "react";
import Day from "./day";
import { useHabitContext } from "./habit";
import { HabitCard } from "./habit-card";

export default function HabitRow({ habit }: { habit: Habit.Definition }) {
  const { name, completedDates, id, color, frequency } = habit;
  const { calendarDates } = useHabitContext();
  const markHabit = useHabitStore((state) => state.markHabit);

  const streak = useMemo(() => {
    return summary(completedDates, frequency).currentStreak;
  }, [completedDates, frequency]);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <HabitCard name={name} id={id} color={color} />
      </div>

      <div className="flex ">
        <div className="flex flex-1 justify-between gap-2">
          {calendarDates.map((date, index) => {
            const dateJS = dayjs(date) as dayjs.Dayjs;
            const formatedDate = dateJS.format("YYYY-M-D");
            return (
              <>
                <div className="flex justify-center">
                  <Day
                    key={index}
                    isActiveDay={frequency[dateJS.day()]}
                    status={completedDates[formatedDate]}
                    color={color}
                    className="flex-1"
                    onClick={() => markHabit(id, formatedDate)}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="font-andalusia flex ">
        <div className="inline-flex justify-center gap-1 self-center ">
          <FireIcon className="h-4 " />
          {streak}
        </div>
      </div>
    </>
  );
}
