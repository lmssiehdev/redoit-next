import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Habit } from "@/types/habitTypes";

type State = {
  habits: {
    [id: string]: Habit.Definition;
  };
};

type Action = {
  markHabit: (id: string, date: string, status?: Habit.Status) => void;
  addHabit: (payload: Partial<Habit.Definition>) => void;
  editHabit: (id: string, payload: Partial<Habit.Definition>) => void;
  deleteHabit: (id: string) => void;
};

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

const store = immer<State & Action>((set, get) => ({
  habits: {},
  markHabit: (id, date, status) => {
    set((state) => {
      const completedDates = state.habits[id].completedDates;
      if (completedDates[date] === "skipped") {
        delete completedDates[date];
      } else {
        if (completedDates[date] === "checked")
          completedDates[date] = "skipped";
        else completedDates[date] = "checked";
      }

      return state;
    });
  },
  addHabit: (payload) => {
    const id = new Date().getTime().toString();
    const habit = {
      ...HABIT_TEMPLATE,
      ...payload,
      id,
    };

    set((state) => {
      state.habits[id] = habit;
      return state;
    });
  },
  editHabit: (id, payload) =>
    set((state) => {
      state.habits[id] = {
        ...state.habits[id],
        ...payload,
      };
      return state;
    }),
  deleteHabit: (id) =>
    set((state) => {
      delete state.habits[id];
      return state;
    }),
}));

export const useHabitStore = create<State & Action>()(
  devtools(
    persist(store, {
      name: "habit-storage",
    })
  )
);
