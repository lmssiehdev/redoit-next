import {
  summary,
  sortDates,
  getDatesParameter,
  type datesParam,
} from "./calculateStreaks";

interface StreakRange {
  start: Date;
  end: Date | null;
  duration: number;
}

function streakRanges(datesParam: datesParam = []) {
  if (datesParam == undefined || datesParam.length === 0) {
    return [];
  }

  const { streaks = [] } = summary(datesParam, []);
  const dates = getDatesParameter(datesParam) as string[];
  const allDates = [...sortDates(dates)];

  return streaks
    .reduce((acc: StreakRange[], streak) => {
      let start, end;
      let days = allDates.slice(0, streak);
      allDates.splice(0, streak);

      if (days && days.length > 1) {
        start = new Date(days[0]);
        end = new Date(days[days.length - 1]);
      } else {
        start = new Date(days[0]);
        end = null;
      }

      return [
        ...acc,
        {
          start,
          end,
          duration: streak,
        },
      ];
    }, [])
    .reverse();
}

export { streakRanges };
