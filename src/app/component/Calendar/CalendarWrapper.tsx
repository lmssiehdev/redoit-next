import { useDay } from "@/hooks/useDay";
import MonthlyNavigation from "./MonthlyNavigation";
import MonthlyView from "./MonthlyView";

function CalendarWrapper() {
  const { year, month, goToNextMonth, goToPrevMonth } = useDay();

  return (
    <div className="flex flex-col w-[350px]">
      <MonthlyNavigation
        month={month.current}
        year={year.current}
        nextMonth={goToNextMonth}
        prevMonth={goToPrevMonth}
        className="py-4 font-andalusia"
        isCurrentMonth={month.isCurrentMonth}
      />
      <MonthlyView
        startOffset={month.startOffset}
        daysInMonth={month.daysInMonth}
        date={{ year: year.current, month: month.current }}
      />
    </div>
  );
}

export default CalendarWrapper;
