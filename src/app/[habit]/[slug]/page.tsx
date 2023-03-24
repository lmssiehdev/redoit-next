"use client";

import CalendarWrapper from "@/app/component/Calendar/CalendarWrapper";
import MyResponsiveLine from "@/app/component/Charts/Chart";
import { HabitCard } from "@/app/component/Habit/Habit";
import Streaks from "@/app/component/Habit/Streaks/Streaks";
import { IHabit, useHabitStore } from "@/app/store/habits";
import { createContext, useContext } from "react";

const habitPageContext = createContext({} as IHabit);

export const useHabitPageContext = () => {
  return useContext(habitPageContext);
};
export default function Habit({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const habits = useHabitStore((state) => state.habits);

  // const { name, id, color, completedDates } = habits[slug];

  return <div>hail</div>;

  // return (
  //   <div className="max-w-[500px] w-[350px]">
  //     <div className="py-4">
  //       <h1 className="text-4xl font-andalusia">Redoit</h1>
  //     </div>
  //     <div className="flex justify-between">
  //       <HabitCard name={name} id={id} color={color} />
  //     </div>

  //     <habitPageContext.Provider value={habits[slug]}>
  //       <div className="">
  //         <CalendarWrapper />
  //         <div>
  //           <h3 className="text-center font-bold text-3xl py-4">Streaks</h3>
  //           <Streaks />
  //         </div>
  //         <div>
  //           <h3 className="text-center font-bold text-3xl py-4">
  //             Completion Rate
  //           </h3>
  //           <div className="h-[300px] w-[350px] ">
  //             <MyResponsiveLine color={color} dates={completedDates} />
  //           </div>
  //         </div>
  //       </div>
  //     </habitPageContext.Provider>
  //   </div>
  // );
}
