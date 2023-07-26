"use client";

import Habit from "@/app/component/Habit/Habit";
import { useHabitStore } from "@/store/habits";
import AddHabitModal from "@/app/component/Habit/HabitModal/Modal";
import Button from "@/components/common/Button";

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
  const { habits } = useHabitStore((state) => state);

  const activeHabits = Object.keys(habits).filter(
    (key) => !habits[key].archived
  );
  return (
    <>
      {activeHabits.length > 0 ? (
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
  const { addHabit } = useHabitStore((state) => state);

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <div className="py-3 text-3xl">please create a habit</div>
        <AddHabitModal onClose={(payload) => addHabit(payload)}>
          <Button color="green" size="sm" mode="primary">
            Add Habit
          </Button>
        </AddHabitModal>
      </div>
    </div>
  );
}
