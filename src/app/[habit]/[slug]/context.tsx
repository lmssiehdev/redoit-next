import { IHabit } from "@/store/habits";
import { createContext, useContext } from "react";

const habitPageContext = createContext({} as IHabit);

export const useHabitPageContext = () => {
  return useContext(habitPageContext);
};

export function HabitContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: IHabit;
}) {
  return (
    <habitPageContext.Provider value={value}>
      {children}
    </habitPageContext.Provider>
  );
}
