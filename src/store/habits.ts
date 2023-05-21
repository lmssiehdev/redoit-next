import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Habit } from "@/types/habitTypes";

interface HabitState {
  habits: {
    [id: string]: Habit.Definition;
  };
  markHabit: (id: string, date: string, status?: Habit.Status) => void;
  addHabit: (payload: Partial<Habit.Definition>) => void;
  editHabit: (id: string, payload: Partial<Habit.Definition>) => void;
  deleteHabit: (id: string) => void;
}

const HABIT_TEMPLATE = {
  id: "id",
  name: "please add a name",
  frequency: new Array(7).fill(true),
  updatedAt: new Date(),
  createdAt: new Date(),
  completedDates: {},
  color: "#EF726E",
  archived: false,
};

export const useHabitStore = create<HabitState>()(
  devtools(
    persist(
      (set, get) => ({
        habits: {},
        markHabit: (id, date, status) => {
          set((state) => {
            const completedDates = { ...state.habits[id].completedDates };
            if (completedDates[date] === "skipped") {
              delete completedDates[date];
            } else {
              if (completedDates[date] === "checked")
                completedDates[date] = "skipped";
              else completedDates[date] = "checked";
            }
            return {
              habits: {
                ...state.habits,
                [id]: {
                  ...state.habits[id],
                  completedDates: { ...completedDates },
                },
              },
            };
          });
        },
        addHabit: (payload) => {
          const id = new Date().getTime().toString();
          const habit = {
            ...HABIT_TEMPLATE,
            id,
            ...payload,
          };

          set((state) => ({
            habits: {
              ...state.habits,
              [id]: { ...habit },
            },
          }));
        },
        editHabit: (id, payload) => {
          const habit = {
            ...HABIT_TEMPLATE,
            id,
            ...payload,
          };

          return set((state) => ({
            habits: {
              ...state.habits,
              [id]: {
                ...habit,
                completedDates: { ...state.habits[id].completedDates },
              },
            },
          }));
        },
        deleteHabit: (id) =>
          set((state) => {
            delete state.habits[id];
            return {
              habits: {
                ...state.habits,
              },
            };
          }),
      }),
      {
        name: "habit-storage",
      }
    )
  )
);
