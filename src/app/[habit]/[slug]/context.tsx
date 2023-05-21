import type { Habit } from "@/types/habitTypes";
import { createContext, useContext } from "react";

const habitPageContext = createContext({} as Habit.Definition);

export const useHabitPageContext = () => {
  return useContext(habitPageContext);
};

export function HabitContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Habit.Definition;
}) {
  return (
    <habitPageContext.Provider value={value}>
      {children}
    </habitPageContext.Provider>
  );
}
