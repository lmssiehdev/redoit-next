"use client";

import Day from "@/app/component/Habit/Day/Day";
import AddHabitModal from "@/app/component/Habit/HabitModal/Modal";
import VerticalCalendarWrapper from "@/app/component/Habit/VerticalCalendar";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FireIcon,
  PenIcon,
} from "@/app/component/Icons";
import { days } from "@/constants";
import { IHabit } from "@/store/habits";
import { summary } from "date-streaks";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useBreakpoint } from "use-breakpoint";
import { create } from "zustand";

interface IhabitContext {
  calendarDates: string[];
  goToPrevDay: () => void;
  goToNextDay: () => void;
  habits: {
    [id: string]: IHabit;
  };
}

const habitContext = createContext({} as IhabitContext);

export const useHabitContext = () => {
  return useContext(habitContext);
};

interface State {
  date: dayjs.Dayjs;
}

interface Action {
  type: "NextDay" | "PrevDay";
}

const HABIT_TEMPLATE = {
  id: 1,
  name: "do 24 pushups",
  frequency: new Array(7).fill(true),
  updatedAt: new Date(),
  createdAt: new Date(),
  completedDates: {},
  color: "#EF726E",
  archived: false,
};

interface HabitState {
  habits: {
    [id: string]: IHabit;
  };
  markHabit: (id: string, date: string, status?: "checked" | "skipped") => void;
}

const useHabitStore = create<HabitState>()((set, get) => ({
  habits: {
    dummy_habit_one: {
      id: "dummy_habit_one",
      name: "learn 3 new words",
      frequency: new Array(7).fill(true),
      updatedAt: new Date(),
      createdAt: new Date(),
      completedDates: {},
      color: "#bc8294",
      archived: false,
    },
    dummy_habit_two: {
      id: "dummy_habit_two",
      name: "please add a name",
      frequency: new Array(7).fill(true),
      updatedAt: new Date(),
      createdAt: new Date(),
      completedDates: {},
      color: "#f9ac78",
      archived: false,
    },
    dummy_habit_three: {
      id: "dummy_habit_three",
      name: "do 24 pushups",
      frequency: new Array(7).fill(true),
      updatedAt: new Date(),
      createdAt: new Date(),
      completedDates: {},
      color: "#EF726E",
      archived: false,
    },
  },
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
}));

const BREAKPOINTS = { 3: 0, 4: 420, 6: 576, 7: 700 };

export default function DummyHabitDemo() {
  const path = usePathname();
  console.log(path);
  // Get the current date
  const [last7Days, setLast7Days] = useState<string[]>([]);
  const { habits, markHabit } = useHabitStore((state) => state);
  const [state] = useState({
    date: dayjs(),
  });
  // const { addHabit, habits } = useHabitStore((state) => state);
  const { breakpoint } = useBreakpoint(BREAKPOINTS, 7);

  useEffect(() => {
    setLast7Days([]);
    console.log(state, setLast7Days);
    const arr: string[] = [];
    for (let i = 0; i < breakpoint; i++) {
      const date = state.date.subtract(i, "day");
      arr.push(date.toString());
    }
    setLast7Days([...arr.reverse()]);
  }, [state.date, breakpoint]);

  return (
    <habitContext.Provider
      value={{
        calendarDates: last7Days,
        goToNextDay: () => {},
        goToPrevDay: () => {},
        habits,
      }}
    >
      <>
        <>
          <div className="my-2 grid grid-cols-[minmax(100px,200px),6fr,40px] gap-3">
            <div className="flex items-center justify-end">
              <ChevronLeftIcon className="h-5 text-black/40 cursor-not-allowed" />
            </div>
            <div className="flex flex-1 justify-between">
              <div className="flex flex-1">
                {last7Days.map((item: string) => {
                  const date = new Date(item);
                  return (
                    <div
                      key={date.toDateString()}
                      className="flex-1 text-center"
                    >
                      <p>{days[date.getDay()].substring(0, 3)}</p>
                      <p>{date.getDate()}</p>
                      {/* <p key={item}>{months[date.getMonth()].substring(0, 3)}</p> */}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-start">
              <ChevronRightIcon className="h-5 text-black/40 cursor-not-allowed" />
            </div>
          </div>

          {Object.keys(habits).map((key) => {
            return (
              <div
                key={key}
                className="my-2 grid grid-cols-[minmax(100px,200px),6fr,40px] gap-3"
              >
                <HabitRow habit={habits[key]} />
              </div>
            );
          })}
        </>
      </>
    </habitContext.Provider>
  );
}

const HabitRow = ({ habit }: { habit: IHabit }) => {
  const { name, completedDates, id, color, frequency } = habit;
  const { calendarDates } = useHabitContext();
  const { markHabit } = useHabitStore((state) => state);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <HabitCard name={name} id={id} color={color} />
      </div>

      <div className="flex ">
        <div className="flex flex-1 justify-between gap-2">
          {calendarDates.map((date, index) => {
            const dateJS = dayjs(date) as dayjs.Dayjs;
            const formatedDate = dateJS.format("YYYY-M-D");
            return (
              <>
                <div className="flex justify-center">
                  <Day
                    key={index}
                    isActiveDay={frequency[dateJS.day()]}
                    status={completedDates[formatedDate]}
                    color={color}
                    className="flex-1"
                    onClick={() => markHabit(id, formatedDate)}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="font-andalusia flex ">
        <div className="inline-flex justify-center gap-1 self-center ">
          <FireIcon className="h-4 " />
          {summary({ dates: Object.keys(completedDates) }).currentStreak}
        </div>
      </div>
    </>
  );
};

export const HabitCard = ({
  id,
  color,
  name,
}: {
  id: string;
  color: string;
  name: string;
}) => {
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
        <Link href={`habit/${id}/`} className="overflow-hidden text-ellipsis">
          {name}
        </Link>
      </div>
      {/* <AddHabitModal
        id={id}
        onClose={(payload) => {
          editHabit(id, payload);
        }}
      >
        <div>
          <PenIcon className="h-4 ml-1" />
        </div>
      </AddHabitModal> */}
    </>
  );
};
