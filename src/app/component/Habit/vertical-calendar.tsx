import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import Icon, { ClickableIconWrapper } from "@/components/common/Icon";
import { days } from "@/constants";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useHabitContext } from "./habit";

interface Props {
  className?: string;
}

export default function VerticalCalendarWrapper({ className }: Props) {
  const { calendarDates, goToNextDay, goToPrevDay } = useHabitContext();
  const [parent] = useAutoAnimate();

  return (
    <>
        <div className="flex items-center justify-center">
          <ClickableIconWrapper
            onClick={goToPrevDay}
            className="flex items-center justify-end p-2 ml-auto"
          >
            <Icon asChild>
              <ChevronLeftIcon />
            </Icon>
          </ClickableIconWrapper>
        </div>
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
        <div className="flex items-center justify-center">
          <ClickableIconWrapper
            onClick={goToNextDay}
            className="flex items-center justify-end p-2 ml-auto"
          >
            <Icon asChild>
              <ChevronRightIcon />
            </Icon>
          </ClickableIconWrapper>
        </div>
    </>
  );
}
