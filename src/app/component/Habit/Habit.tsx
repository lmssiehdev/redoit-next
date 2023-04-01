"use client";

import AddHabitModal from "@/app/component/Habit/Modal";
import { FireIcon, PenIcon } from "@/app/component/Icons";
import Button from "@/components/common/Button";
import { IHabit, useHabitStore } from "@/store/habits";
import { currentStreak } from "@/utils/calculateStreak";
import { streakRanges, summary, trackRecord } from "date-streaks";
import dayjs from "dayjs";
import Link from "next/link";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useSupabase } from "../../../context/supabase-provider";
import Day from "./Day/Day";
import VerticalCalendarWrapper from "./VerticalCalendar/VerticalCalendar";

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

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "NextDay": {
      const isAfter = dayjs().isAfter(state.date, "day");
      if (!isAfter) return state;
      return { ...state, ...{ date: state.date.add(1, "day") } };
    }
    case "PrevDay": {
      return { ...state, ...{ date: state.date.add(-1, "day") } };
    }
  }
}

export default function Habit() {
  // Get the current date
  const [last7Days, setLast7Days] = useState<string[]>([]);
  const [state, dispatch] = useReducer(reducer, {
    date: dayjs(),
  });
  const { supabase, userId } = useSupabase();
  const { addHabit, habits } = useHabitStore((state) => state);

  useEffect(() => {
    setLast7Days([]);
    const arr: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = state.date.subtract(i, "day");
      arr.push(date.toString());
    }
    setLast7Days([...arr.reverse()]);
  }, [state.date]);

  return (
    <habitContext.Provider
      value={{
        calendarDates: last7Days,
        goToNextDay: () => dispatch({ type: "NextDay" }),
        goToPrevDay: () => dispatch({ type: "PrevDay" }),
        habits,
      }}
    >
      <>
        <>
          <VerticalCalendarWrapper />
          {Object.keys(habits).map((key) => {
            const habit = habits[key];
            return (
              <div
                key={key}
                className="my-2 grid grid-cols-[minmax(100px,200px),6fr,40px] gap-3"
              >
                <HabitRow habit={habit} />
              </div>
            );
          })}
          <AddHabitModal onClose={(payload) => addHabit(payload)}>
            <Button color="green" size="sm" primary>
              Add Habit
            </Button>
          </AddHabitModal>
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
  const { editHabit } = useHabitStore((state) => state);

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
      <AddHabitModal
        id={id}
        onClose={(payload) => {
          editHabit(id, payload);
        }}
      >
        <div>
          <PenIcon className="h-4 ml-1" />
        </div>
      </AddHabitModal>
    </>
  );
};
