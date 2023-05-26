"use client";

import { useHabitStore } from "@/store/habits";
import Habit from "../component/Habit/Habit";

function ArchivedPage() {
  const habits = useHabitStore((state) => state.habits);
  const archivedHabits = Object.keys(habits).find(
    (key) => habits[key].archived === true
  );

  return (
    <>
      {!archivedHabits ? (
        <> No archived habits yet! </>
      ) : (
        <>
          <h2 className="text-2xl highlight ">Archived</h2>
          <Habit />
        </>
      )}
    </>
  );
}

export default ArchivedPage;
