import { Stats } from "fs";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Checked } from "../component/Habit/Day/Day.stories";

export type habitStatus = "checked" | "skipped";

interface HabitState {
  habits: {
    [id: string]: IHabit;
  };
  markHabit: (id: string, date: string, status?: habitStatus) => void;
  addHabit: (payload: Partial<IHabit>) => void;
  editHabit: (id: string, payload: Partial<IHabit>) => void;
  deleteHabit: (id: string) => void;
}

export interface IHabit {
  id: string;
  name: string;
  frequency: boolean[];
  completedDates: {
    [date: string]: habitStatus;
  };
  createdAt: Date;
  updatedAt: Date;
  color: string;
  archived: boolean;
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
