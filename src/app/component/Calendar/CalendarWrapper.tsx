import { useMonth } from "@/hooks/dayjs/useMonth";
import { useDay } from "@/hooks/useDay";
import MonthlyNavigation from "./MonthlyNavigation";
import MonthlyView from "./MonthlyView";

function CalendarWrapper() {
  // TODO: use context maybe?

  const {
    currentYear,
    currentMonth,
    goToNextMonth,
    goToPrevMonth,
    isCurrentMonth,
    startOffset,
    daysInMonth,
  } = useMonth();

  return (
    <div className="flex flex-col w-[350px]">
      <MonthlyNavigation
        month={currentMonth}
        year={currentYear}
        nextMonth={goToNextMonth}
        prevMonth={goToPrevMonth}
        className="py-4 font-andalusia"
        isCurrentMonth={isCurrentMonth}
      />
      <MonthlyView
        startOffset={startOffset}
        daysInMonth={daysInMonth}
        date={{ year: currentYear, month: currentMonth }}
      />
    </div>
  );
}

export default CalendarWrapper;
