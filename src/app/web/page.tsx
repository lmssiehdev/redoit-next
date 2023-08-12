"use client";

import Habit, { AddHabitButton } from "@/app/component/Habit/habit";
import { useHabitStore } from "@/store/habits";

export default function Web() {
  return (
    <>
      {true ? (
        <>
          <PageContent />
        </>
      ) : (
        <>
          <div>Please Log in!</div>
        </>
      )}
    </>
  );
}

const PageContent = () => {
  const habits = useHabitStore((state) => state.habits);

  const activeHabits = Object.keys(habits).some((key) => !habits[key].archived);

  return (
    <>
      {activeHabits ? (
        <>
          <h2 className="text-2xl highlight ">My Habits</h2>
          <Habit />
        </>
      ) : (
        <NoHabitsPrompt />
      )}
    </>
  );
};

function NoHabitsPrompt() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <div className="py-3 text-3xl">please create a habit</div>
        <AddHabitButton />
      </div>
    </div>
  );
}
