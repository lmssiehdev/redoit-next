"use client";

import HabitEditor from "@/app/ui/modals/add-edit-habit-modal";
import Button from "@/components/common/Button";
import { useDateNavigator } from "@/hooks/dayjs/use-date-navigator";
import { useHabitStore } from "@/store/habits";
import type { Habit } from "@/types/habit-types";
import { usePathname } from "next/navigation";
import { createContext, useContext, useMemo, useState } from "react";
import { useBreakpoint } from "use-breakpoint";
import HabitRow from "./habit-row";
import VerticalCalendarWrapper from "./vertical-calendar";

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
  const { dateArray, goToNextDay, goToPrevDay } = useDateNavigator();
  const habits = useHabitStore((state) => state.habits);
  const { breakpoint } = useBreakpoint(BREAKPOINTS, 7);

  return (
    <habitContext.Provider
      value={{
        calendarDates: [...dateArray].splice(0, breakpoint),
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

  const filteredHabits = useMemo(() => {
    const isArchived = path === "/archive";
    return Object.keys(habits).filter(
      (key) => habits[key].archived === isArchived
    );
  }, [habits, path]);

  return (
    <>
      <HabitContextProvider>
        <div className="my-2 grid grid-cols-[minmax(0px,200px),6fr,40px] gap-3">
          <VerticalCalendarWrapper />
          {filteredHabits.map((key) => {
            const habit = habits[key];
            return <HabitRow key={key} habit={habit} />;
          })}
        </div>
      </HabitContextProvider>
      <AddHabitButton />
    </>
  );
}

export function AddHabitButton() {
  const [showModal, setShowModal] = useState(false);
  const addHabit = useHabitStore((state) => state.addHabit);

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        color="green"
        size="sm"
        mode="primary"
      >
        Add Habit
      </Button>
      <HabitEditor
        setShowModal={setShowModal}
        showModal={showModal}
        onSave={(payload) => {
          console.log("habit", payload);
          addHabit(payload);
        }}
      />
    </>
  );
}
