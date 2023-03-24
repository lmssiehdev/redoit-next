import { useHabitContext } from "../Habit";
import { ChevronLeftIcon, ChevronRightIcon } from "@/app/component/Icons";
import { useBreakpoint } from "use-breakpoint";

const dayS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Props {
  className?: string;
}

export function VerticalCalendar({ className }: Props) {
  const { calendarDates, goToNextDay, goToPrevDay } = useHabitContext();

  return (
    <>
      <div className="flex items-center justify-end">
        <PrevDayButton trigger={goToPrevDay}>
          <ChevronLeftIcon className="h-5" />
        </PrevDayButton>
      </div>
      <div className="flex flex-1 justify-between">
        <div className="flex flex-1">
          {calendarDates.map((item: string) => {
            const date = new Date(item);
            return (
              <div key={date} className="flex-1 text-center">
                <p>{dayS[date.getDay()].substring(0, 3)}</p>
                <p>{date.getDate()}</p>
                {/* <p key={item}>{months[date.getMonth()].substring(0, 3)}</p> */}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-start">
        <NextDayButton trigger={goToNextDay}>
          <ChevronRightIcon className="h-5" />
        </NextDayButton>
      </div>
    </>
  );
}

function PrevDayButton({ children, trigger }) {
  return <button onClick={trigger}>{children}</button>;
}
function NextDayButton({ children, trigger }) {
  return <button onClick={trigger}>{children}</button>;
}

export default function VerticalCalendarWrapper({ className }: Props) {
  return (
    <div className="grid grid-cols-[minmax(100px,200px),6fr,40px] gap-3">
      <VerticalCalendar />
    </div>
  );
}
