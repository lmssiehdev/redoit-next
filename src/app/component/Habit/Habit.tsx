"use client";

import AddHabitModal from "@/app/component/Habit/HabitModal/Modal";
import Button from "@/components/common/Button";
import { useDay } from "@/hooks/useDay";
import { useHabitStore } from "@/store/habits";
import type { Habit } from "@/types/habitTypes";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { usePathname } from "next/navigation";
import { createContext, useContext } from "react";
import { useBreakpoint } from "use-breakpoint";
import HabitRow from "./HabitRow";
import VerticalCalendarWrapper from "./VerticalCalendar";

interface IhabitContext {
  calendarDates: string[];
  goToPrevDay: () => void;
  goToNextDay: () => void;
  habits: {
    [id: string]: Habit.Definition;
  };
}

const habitContext = createContext({} as IhabitContext);

export const useHabitContext = () => {
  const context = useContext(habitContext);

  if (context === undefined) {
    throw new Error(
      "useHabitContext must be used within a HabitContextProvider"
    );
  }

  return context;
};

const BREAKPOINTS = { 3: 350, 5: 420, 7: 576, 10: 700 };

export function HabitContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chunk, goToNextDay, goToPrevDay } = useDay();
  const habits = useHabitStore((state) => state.habits);
  const { breakpoint } = useBreakpoint(BREAKPOINTS, 7);

  return (
    <habitContext.Provider
      value={{
        calendarDates: [...chunk].splice(0, breakpoint),
        goToNextDay,
        goToPrevDay,
        habits,
      }}
    >
      {children}
    </habitContext.Provider>
  );
}

export default function Habit() {
  const path = usePathname();
  const habits = useHabitStore((state) => state.habits);
  const addHabit = useHabitStore((state) => state.addHabit);
  const [parent] = useAutoAnimate();

  const isArchived = path === "/archive";
  const filteredHabits = Object.keys(habits).filter(
    (key) => habits[key].archived === isArchived
  );

  return (
    <HabitContextProvider>
      <>
        <div className="my-2 grid grid-cols-[minmax(0px,200px),6fr,40px] gap-3">
          <VerticalCalendarWrapper />
          {filteredHabits.map((key) => {
            const habit = habits[key];
            return <HabitRow key={key} habit={habit} />;
          })}
        </div>
        <AddHabitModal onClose={(payload) => addHabit(payload)}>
          <Button color="green" size="sm" mode="primary">
            Add Habit
          </Button>
        </AddHabitModal>
      </>
    </HabitContextProvider>
  );
}
