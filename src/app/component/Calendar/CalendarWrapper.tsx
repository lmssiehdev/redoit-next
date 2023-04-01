import dayjs, { type Dayjs } from "dayjs";
import { useReducer, useState } from "react";
import useBreakpoint from "use-breakpoint";
import MonthlyNavigation from "./MonthlyNavigation";
import MonthlyView from "./MonthlyView";

interface State {
  date: Dayjs;
}

interface Action {
  type: "NextMonth" | "PrevMonth";
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "NextMonth": {
      const isAfter = dayjs().isAfter(state.date, "month");
      if (!isAfter) return state;
      return { ...state, ...{ date: state.date.add(1, "month") } };
    }
    case "PrevMonth": {
      return { ...state, ...{ date: state.date.add(-1, "month") } };
    }
  }
}

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

function CalendarWrapper() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "desktop");
  const [state, dispatch] = useReducer(reducer, {
    date: dayjs(),
  });

  const now = {
    date: state.date.date(),
    month: state.date.month(),
    year: state.date.year(),
    daysInMonth: state.date.daysInMonth(),
    startOffset: state.date.startOf("month").day(),
  };

  return (
    <div className="flex flex-col w-[350px]">
      <MonthlyNavigation
        month={now.month}
        year={now.year}
        nextMonth={() => dispatch({ type: "NextMonth" })}
        prevMonth={() => dispatch({ type: "PrevMonth" })}
        className="py-4 font-andalusia"
      />
      <MonthlyView
        startOffset={now.startOffset}
        daysInMonth={now.daysInMonth}
        date={{ year: now.year, month: now.month }}
      />
    </div>
  );
}

export default CalendarWrapper;
