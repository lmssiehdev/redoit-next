import { useHabitStore } from "@/store/habits";
import { useHabitPageContext } from "@/app/[habit]/[slug]/context";
import dayjs from "dayjs";
import Day from "../Habit/day";
import { days } from "@/constants";

interface Dates {
  [key: string]: number;
}

interface Props {
  startOffset: number;
  daysInMonth: number;
  // today: string;
  date: {
    year: number;
    month: number;
  };
}

function MonthlyView({ startOffset, daysInMonth, date }: Props) {
  const markHabit = useHabitStore((state) => state.markHabit);
  const habit = useHabitPageContext();

  return (
    <div className="">
      <div className=" grid grid-cols-7 grid-rows-7 children:aspect-square children:h-12 gap-3">
        {days.map((day) => (
          <div key={day} className=" flex justify-center items-center opaci ">
            {day.substr(0, 2)}
          </div>
        ))}
        {[...Array(startOffset)].map((e, index) => {
          return <div key={index}></div>;
        })}
        {[...Array(daysInMonth)].map((day, index) => {
          const dateJS = dayjs(
            `${date.month + 1}-${index + 1}-${date.year}`
          ) as dayjs.Dayjs;
          const formatedDate = dateJS.format("YYYY-M-D");
          return (
            <div className="flex justify-center" key={day} title={formatedDate}>
              <Day
                size="full"
                status={habit.completedDates[formatedDate]}
                color={habit.color}
                isActiveDay={habit.frequency[dateJS.day()]}
                onClick={() => {
                  markHabit(habit.id, formatedDate);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MonthlyView;
