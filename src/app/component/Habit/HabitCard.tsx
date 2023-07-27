"use client";
import AddHabitModal from "@/app/component/Habit/HabitModal/Modal";
import { PenIcon } from "@/app/component/Icons";
import { useHabitStore } from "@/store/habits";
import Link from "next/link";

export const HabitCard = ({
  id,
  color,
  name,
}: {
  id: string;
  color: string;
  name: string;
}) => {
  const editHabit = useHabitStore((state) => state.editHabit);

  return (
    <>
      <div className="flex items-center gap-2 overflow-hidden">
        <div>
          <div
            style={{
              backgroundColor: color,
            }}
            className="h-2 w-2 rounded-full block"
          ></div>
        </div>
        <Link
          href={`habit/${id}/`}
          className="overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {name}
        </Link>
      </div>
      <AddHabitModal
        id={id}
        onClose={(payload) => {
          editHabit(id, payload);
        }}
      >
        <div>
          <PenIcon className="h-4 ml-1 hidden md:block" />
        </div>
      </AddHabitModal>
    </>
  );
};
