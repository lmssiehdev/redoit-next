import { habitStatus } from "@/app/store/habits";

export type Dates = {
  [key: string]: habitStatus;
};

export function minDate(dates: Dates) {
  const keys = Object.keys(dates);
  if (typeof keys !== "undefined" && keys.length > 0) {
    return keys.reduce(function (p, v) {
      const pd = new Date(p),
        vd = new Date(v);
      return pd < vd ? pd : vd;
    });
  }
}

export function currentStreak(dates: Dates) {
  let streak = 0;
  let skippedDays = 0;
  let n = new Date(new Date().setDate(new Date().getDate() + 1));
  const min = new Date(minDate(dates));
  let key = "";
  while (min <= n) {
    n = new Date(n.setDate(n.getDate() - 1));
    key = `${n.getFullYear()}-${n.getMonth() + 1}-${n.getDate()}`;
    if (!(key in dates)) {
      if (skippedDays == 0) {
        skippedDays++;
      } else {
        break;
      }
    } else if (dates[key] == "skipped") {
      if (skippedDays == 0) {
        skippedDays++;
      } else {
        break;
      }
    } else if (dates[key] == "checked") {
      skippedDays = 0;
      streak++;
    }
  }
  return streak;
}

export function longestStreak(dates) {
  let streak = 0;
  let max = 0;
  let n = new Date(new Date().setDate(new Date().getDate() + 1));
  const min = new Date(minDate(dates));
  let key = "";

  while (min < n) {
    n = new Date(n.setDate(n.getDate() - 1));
    key = `${n.getFullYear()}-${n.getMonth() + 1}-${n.getDate()}`;
    if (
      !(key in dates) ||
      (key in dates && dates[key] !== "checked" && dates[key] !== "skipped")
    ) {
      max = streak > max ? streak : max;
      streak = 0;
    } else {
      streak++;
    }
  }
  return max;
}
