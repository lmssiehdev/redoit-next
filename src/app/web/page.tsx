"use client";

import Habit from "@/app/component/Habit/Habit";
import { useHabitStore } from "@/store/habits";
import AddHabitModal from "@/app/component/Habit/Modal";
import Button from "@/components/common/Button";
import { useSupabase } from "@/context/supabase-provider";

export default function Web() {
  const habits = useHabitStore((state) => state.habits);
  const { supabase, userId } = useSupabase();

  // async function ee() {
  //   const { data, error } = await supabase
  //     .from("habits")
  //     .select("habits")
  //     .eq("id", userId.user.id);

  //   console.log(data, userId.user.id);
  // }

  // async function cc() {
  //   const { data, error } = await supabase
  //     .from("habits")
  //     .update({
  //       habits: { ...habits },
  //     })
  //     .eq("id", userId.user.id);

  //   console.log(data, error, { ...habits });
  // }

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
  const { habits, addHabit } = useHabitStore((state) => state);

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
        <div className="flex flex-col items-center">
          <div className="text-center">
            <div className="py-3 text-3xl">please create a habit</div>
            <AddHabitModal onClose={(payload) => addHabit(payload)}>
              <Button color="green" size="sm" primary>
                Add Habit
              </Button>
            </AddHabitModal>
          </div>
        </div>
      )}
    </>
  );
};
