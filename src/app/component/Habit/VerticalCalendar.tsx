import { useHabitContext } from "./Habit";
import { ChevronLeftIcon, ChevronRightIcon } from "@/app/component/Icons";
import { useBreakpoint } from "use-breakpoint";
import { days, months } from "@/constants";
import Icon, { ClickableIconWrapper } from "@/components/common/Icon";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Props {
  className?: string;
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

export default function VerticalCalendarWrapper({ className }: Props) {
  const { calendarDates, goToNextDay, goToPrevDay } = useHabitContext();
  const [parent] = useAutoAnimate();

  return (
    <>
      <CalendarNavigation.Root>
        <div className="flex items-center justify-center">
          <ClickableIconWrapper
            as={CalendarNavigation.Trigger}
            onClick={goToPrevDay}
            className="flex items-center justify-end p-2 ml-auto"
          >
            <Icon as={ChevronLeftIcon}></Icon>
          </ClickableIconWrapper>
        </div>

        <CalendarNavigation.Content>
          <div className="flex flex-1 justify-between" ref={parent}>
            <div className="flex flex-1">
              {calendarDates &&
                calendarDates.length > 0 &&
                calendarDates.map((item: string) => {
                  const date = new Date(item);
                  return (
                    <div
                      key={date.toDateString()}
                      className="flex-1 text-center"
                    >
                      <span className="w-9">
                        <p>{days[date.getDay()].substring(0, 3)}</p>
                        <p>{date.getDate()}</p>
                        {/* <p key={item}>{months[date.getMonth()].substring(0, 3)}</p> */}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </CalendarNavigation.Content>
        <div className="flex items-center justify-center">
          <ClickableIconWrapper
            as={CalendarNavigation.Trigger}
            className="flex items-center justify-center p-2"
            onClick={goToNextDay}
          >
            <Icon as={ChevronRightIcon}></Icon>
          </ClickableIconWrapper>
        </div>
      </CalendarNavigation.Root>
    </>
  );
}
