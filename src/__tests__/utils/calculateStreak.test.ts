import { currentStreak, type Dates } from "@/utils/calculateStreak";

describe("currentStreak", () => {
  test("One skipped day does not reset streak", () => {
    const dates: Dates = {
      "2023-3-20": "checked",
      "2023-3-19": "checked",
      "2023-3-18": "skipped",
      "2023-3-17": "checked",
      "2023-3-16": "checked",
      "2023-3-15": "skipped",
      "2023-3-14": "checked",
      "2023-3-13": "checked",
      "2023-3-12": "checked",
    };
    expect(currentStreak(dates)).toBe(7);
  });

  test("Two skipped days reset streak", () => {
    const dates: Dates = {
      "2023-3-20": "checked",
      "2023-3-19": "checked",
      "2023-3-18": "checked",
      "2023-3-17": "skipped",
      "2023-3-16": "checked",
      "2023-3-15": "skipped",
      "2023-3-14": "skipped",
      "2023-3-13": "checked",
      "2023-3-12": "checked",
    };
    expect(currentStreak(dates)).toBe(5);
  });

  test("returns 0 if there are no checked dates", () => {
    const dates: Dates = {
      "2023-3-20": "skipped",
      "2023-3-19": "skipped",
      "2023-3-18": "skipped",
    };
    expect(currentStreak(dates)).toBe(0);
  });

  test("returns 0 if there are no dates", () => {
    const dates = {};
    expect(currentStreak(dates)).toBe(0);
  });
});
