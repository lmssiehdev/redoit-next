export function DummyHabitContext() {
  return null
}

// "use client";

// import Day from "@/app/component/Habit/Day/Day";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   FireIcon,
// } from "@/app/component/Icons";
// import { days } from "@/constants";
// import { summary } from "@/utils/calculateStreaks";
// import type { Habit } from "@/types/habitTypes";
// import dayjs from "dayjs";
// import React, {
//   createContext,
//   useCallback,
//   useContext,
//   useLayoutEffect,
//   useMemo,
//   useReducer,
//   useState,
// } from "react";
// import { useBreakpoint } from "use-breakpoint";

// interface IhabitContext {
//   calendarDates: string[];
//   goToPrevDay: () => void;
//   goToNextDay: () => void;
//   habits: {
//     [id: string]: Habit.Definition;
//   };
//   markHabit: (payload: {
//     id: string;
//     date: string;
//     status?: Habit.Status;
//   }) => void;
// }

// const habitContext = createContext({} as IhabitContext);

// export const useHabitContext = () => {
//   return useContext(habitContext);
// };

// interface State {
//   date: dayjs.Dayjs;
// }

// interface Action {
//   type: "NextDay" | "PrevDay";
// }

// const HABIT_TEMPLATE = {
//   id: 1,
//   name: "do 24 pushups",
//   frequency: new Array(7).fill(true),
//   updatedAt: new Date(),
//   createdAt: new Date(),
//   completedDates: {},
//   color: "#EF726E",
//   archived: false,
// };

// type Habits = { [id: string]: Habit.Definition };

// type ACTIONTYPE = {
//   type: "MARK_HABIT";
//   payload: {
//     id: string;
//     date: string;
//     status?: "checked" | "skipped";
//   };
// };

// const useMockHabits = () => {
//   const calculateDays = () => {
//     const d = dayjs();
//     return Array(7)
//       .fill(true)
//       .map((_, index) => {
//         return d.subtract(index, "day").format("YYYY-M-D");
//       })
//       .reverse();
//   };

//   const generateDate = () => {
//     const days: {
//       [key: string]: Habit.Status;
//     } = {};
//     memoisedDates.forEach((day) => {
//       if (Math.random() < 0.5)
//         days[day] = Math.random() < 0.5 ? "checked" : "skipped";
//     });
//     return days;
//   };

//   const memoisedDates = useMemo(() => calculateDays(), []);

//   const habits: Habits = {
//     dummy_habit_one: {
//       id: "dummy_habit_one",
//       name: "learn 3 new words",
//       frequency: new Array(7).fill(true),
//       updatedAt: new Date(),
//       createdAt: new Date(),
//       completedDates: generateDate(),
//       color: "#bc8294",
//       archived: false,
//     },
//     dummy_habit_two: {
//       id: "dummy_habit_two",
//       name: "please add a name",
//       frequency: new Array(7).fill(true),
//       updatedAt: new Date(),
//       createdAt: new Date(),
//       completedDates: generateDate(),
//       color: "#f9ac78",
//       archived: false,
//     },
//     dummy_habit_three: {
//       id: "dummy_habit_three",
//       name: "do 24 pushups",
//       frequency: new Array(7).fill(true),
//       updatedAt: new Date(),
//       createdAt: new Date(),
//       completedDates: generateDate(),
//       color: "#EF726E",
//       archived: false,
//     },
//   };

//   const memoisedHabits = useMemo(() => habits, []);

//   return { habits: memoisedHabits, completedDates: memoisedDates };
// };

// const habitReducer = (
//   state: {
//     [key: string]: Habits;
//   },
//   action: ACTIONTYPE
// ): Habits => {
//   switch (action.type) {
//     case "MARK_HABIT": {
//       const { id, date, status } = action.payload;
//       console.log(
//         action.type,
//         action.payload,
//         state.habits[id].completedDates[date]
//       );

//       if (state.habits[id].completedDates[date] === "skipped") {
//         delete state.habits[id].completedDates[date];
//       } else {
//         if (state.habits[id].completedDates[date] === "checked") {
//           state.habits[id].completedDates[date] = "skipped";
//         } else {
//           state.habits[id].completedDates[date] = "checked";
//         }
//       }

//       return { ...state };
//     }

//     default:
//       return { ...state };
//   }
// };

// const BREAKPOINTS = { 3: 0, 4: 420, 6: 576, 7: 700 };

// function DummyHabitDemo() {
//   const { habits, completedDates: dates } = useMemo(() => useMockHabits(), []);
//   console.log(habits);
//   const [state, dispatch] = useReducer(habitReducer, {
//     habits,
//   });
//   // const { breakpoint } = useBreakpoint(BREAKPOINTS, 7);
//   return (
//     <habitContext.Provider
//       value={{
//         calendarDates: dates,
//         goToNextDay: () => {},
//         goToPrevDay: () => {},
//         habits,
//         markHabit: (payload) =>
//           dispatch({
//             type: "MARK_HABIT",
//             payload,
//           }),
//       }}
//     >
//       <>
//         <>
//           <div className="my-2 grid grid-cols-[minmax(100px,200px),6fr,40px] gap-3">
//             <div className="flex items-center justify-end">
//               <ChevronLeftIcon className="h-5 text-black/40 cursor-not-allowed" />
//             </div>
//             <div className="flex flex-1 justify-between">
//               <div className="flex flex-1">
//                 {dates.map((item: string) => {
//                   const date = new Date(item);
//                   return (
//                     <div
//                       key={date.toDateString()}
//                       className="flex-1 text-center"
//                     >
//                       <p>{days[date.getDay()].substring(0, 3)}</p>
//                       <p>{date.getDate()}</p>
//                       {/* <p key={item}>{months[date.getMonth()].substring(0, 3)}</p> */}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//             <div className="flex items-center justify-start">
//               <ChevronRightIcon className="h-5 text-black/40 cursor-not-allowed" />
//             </div>
//           </div>

//           {Object.keys(state.habits).map((key) => {
//             return (
//               <div
//                 key={key}
//                 className="my-2 grid grid-cols-[minmax(100px,200px),6fr,40px] gap-3"
//               >
//                 <HabitRow habit={state.habits[key]} />
//               </div>
//             );
//           })}
//         </>
//       </>
//     </habitContext.Provider>
//   );
// }
// export default React.memo(DummyHabitDemo);

// const HabitRow = ({ habit }: { habit: Habit.Definition }) => {
//   const { name, completedDates, id, color, frequency } = habit;
//   const { calendarDates, markHabit } = useHabitContext();

//   const streak = summary(completedDates, frequency).currentStreak;
//   return (
//     <>
//       <div className="flex items-center justify-between gap-4">
//         <HabitCard name={name} id={id} color={color} />
//       </div>

//       <div className="flex ">
//         <div className="flex flex-1 justify-between gap-2">
//           {calendarDates.map((date, index) => {
//             const dateJS = dayjs(date) as dayjs.Dayjs;
//             return (
//               <>
//                 <div className="flex justify-center">
//                   <Day
//                     key={index}
//                     isActiveDay={frequency[dateJS.day()]}
//                     status={completedDates[date]}
//                     color={color}
//                     className="flex-1"
//                     onClick={() =>
//                       markHabit({
//                         id,
//                         date,
//                       })
//                     }
//                   />
//                 </div>
//               </>
//             );
//           })}
//         </div>
//       </div>
//       <div className="font-andalusia flex ">
//         <div className="inline-flex justify-center gap-1 self-center ">
//           <FireIcon className="h-4 " />
//           {streak}
//         </div>
//       </div>
//     </>
//   );
// };

// export const HabitCard = ({
//   id,
//   color,
//   name,
// }: {
//   id: string;
//   color: string;
//   name: string;
// }) => {
//   return (
//     <>
//       <div className="flex items-center gap-2 overflow-hidden">
//         <div>
//           <div
//             style={{
//               backgroundColor: color,
//             }}
//             className="h-2 w-2 rounded-full block"
//           ></div>
//         </div>
//         <span className="overflow-hidden text-ellipsis whitespace-nowrap">
//           {name}
//         </span>
//       </div>
//     </>
//   );
// };
