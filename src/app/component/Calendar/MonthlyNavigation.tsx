import { ChevronLeftIcon, ChevronRightIcon } from "@/app/component/Icons";
import { months } from "@/constants";



interface Props {
  className?: string;
  month: number;
  year: number;
  nextMonth: () => void;
  prevMonth: () => void;
}

function MonthlyNavigation({
  className,
  month,
  year,
  nextMonth,
  prevMonth,
}: Props) {
  return (
    <div className={`flex items-center justify-between ${className || ""}`}>
      <div className="flex items-center justify-between gap-1 flex-1">
        <button
          onClick={prevMonth}
          className="flex items-center border-1 rounded-md py-1 px-2"
        >
          <ChevronLeftIcon className="h-5" />
        </button>
        <h3 className="text-4xl ">{months[month]}</h3>
        <button
          onClick={nextMonth}
          className="flex items-center border-1 rounded-md py-1 px-2"
        >
          <ChevronRightIcon className="h-5" />
        </button>
      </div>
      {/* <button onClick={() => now.month--}>Front</button> */}
    </div>
  );
}

export default MonthlyNavigation;
