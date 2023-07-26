import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useImmerReducer } from "use-immer";

type State = {
  date: Dayjs;
};

type Action =
  | { type: "goToNextDay" }
  | { type: "goToNextMonth" }
  | { type: "goToNextYear" }
  | { type: "goToPrevDay" }
  | { type: "goToPrevMonth" }
  | { type: "goToPrevYear" };

function mv(
  date: Dayjs,
  operation: "add" | "subtract",
  n: number,
  duration: "day" | "month" | "year"
) {
  if (operation === "add") return date.add(n, duration);
  else if (operation === "subtract") return date.subtract(n, duration);
  else return date;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "goToNextDay": {
      state.date = mv(state.date, "add", 1, "day");
      break;
    }
    case "goToNextMonth": {
      const isAfter = dayjs().isAfter(state.date, "month");
      if (!isAfter) return state;
      state.date = mv(state.date, "add", 1, "month");
      break;
    }
    case "goToPrevYear": {
      state.date = mv(state.date, "subtract", 1, "year");
      break;
    }
    case "goToPrevDay": {
      state.date = mv(state.date, "subtract", 1, "day");
      break;
    }
    case "goToPrevMonth": {
      state.date = mv(state.date, "subtract", 1, "month");
      break;
    }
    case "goToPrevYear": {
      state.date = mv(state.date, "subtract", 1, "year");
      break;
    }
  }
}

export function useDay() {
  const [state, dispatch] = useImmerReducer(reducer, {
    date: dayjs(),
  });

  const [chunk, setChunk] = useState<string[]>([]);

  useMemo(() => {
    const tempArray: string[] = [];
    for (let i = 0; i < 7; i++) {
      const fomatedDate = state.date.subtract(i, "day").format("YYYY-M-D");
      tempArray.push(fomatedDate);
      setChunk(tempArray.reverse());
    }
  }, [state.date]);

  return {
    chunk,
    day: state.date.date(),
    month: {
      current: state.date.month(),
      daysInMonth: state.date.daysInMonth(),
      startOffset: state.date.startOf("month").day(),
      isCurrentMonth: dayjs().isSame(state.date, "month"),
    },
    year: {
      current: state.date.year(),
    },
    goToNextDay: () => dispatch({ type: "goToNextDay" }),
    goToNextMonth: () => dispatch({ type: "goToNextMonth" }),
    goToNextYear: () => dispatch({ type: "goToNextYear" }),
    goToPrevDay: () => dispatch({ type: "goToPrevDay" }),
    goToPrevMonth: () => dispatch({ type: "goToPrevMonth" }),
    goToPrevYear: () => dispatch({ type: "goToPrevYear" }),
  };
}
