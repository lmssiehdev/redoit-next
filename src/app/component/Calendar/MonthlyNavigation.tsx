import { ChevronLeftIcon, ChevronRightIcon } from "@/app/component/Icons";
import Icon, { ClickableIconWrapper } from "@/components/common/Icon";
import { months } from "@/constants";

interface Props {
  className?: string;
  month: number;
  year: number;
  nextMonth: () => void;
  prevMonth: () => void;
  isCurrentMonth: boolean;
}

function MonthlyNavigation({
  className,
  month,
  year,
  nextMonth,
  prevMonth,
  isCurrentMonth,
}: Props) {
  return (
    <div className={`flex items-center justify-between  ${className || ""}`}>
      <div className="flex items-center justify-between gap-1 flex-1">
        <button onClick={prevMonth} className="flex items-center border-1">
          <ClickableIconWrapper className="p-2">
            <Icon asChild>
              <ChevronLeftIcon />
            </Icon>
          </ClickableIconWrapper>
        </button>
        <h3 className="text-4xl ">{months[month]}</h3>

        <button onClick={nextMonth} className="flex items-center border-1">
          <ClickableIconWrapper className="p-2" disabled={isCurrentMonth}>
            <Icon asChild>
              <ChevronRightIcon />
            </Icon>
          </ClickableIconWrapper>
        </button>
      </div>
    </div>
  );
}

export default MonthlyNavigation;
