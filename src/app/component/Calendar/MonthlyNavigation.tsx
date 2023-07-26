import { ChevronLeftIcon, ChevronRightIcon } from "@/app/component/Icons";
import Icon, { ClickableIconWrapper } from "@/components/common/Icon";
import { months } from "@/constants";
import { w } from "windstitch";

interface Props {
  className?: string;
  month: number;
  year: number;
  nextMonth: () => void;
  prevMonth: () => void;
  isCurrentMonth: boolean;
}
function CalendarNavigation({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

CalendarNavigation.Root = CalendarNavigation;

function CalendarNavigationText({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

CalendarNavigation.Content = CalendarNavigationText;

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
}

function CalendarNavigationTrigger({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

CalendarNavigation.Trigger = CalendarNavigationTrigger;

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
        <CalendarNavigation.Trigger
          onClick={prevMonth}
          className="flex items-center border-1"
        >
          <ClickableIconWrapper className="p-2">
            <Icon as={ChevronLeftIcon}></Icon>
          </ClickableIconWrapper>
        </CalendarNavigation.Trigger>
        <CalendarNavigation.Content>
          <h3 className="text-4xl ">{months[month]}</h3>
        </CalendarNavigation.Content>

        <CalendarNavigation.Trigger
          onClick={nextMonth}
          className="flex items-center border-1"
        >
          <ClickableIconWrapper className="p-2" disabled={isCurrentMonth}>
            <Icon as={ChevronRightIcon}></Icon>
          </ClickableIconWrapper>
        </CalendarNavigation.Trigger>
      </div>
    </div>
  );
}

export default MonthlyNavigation;
