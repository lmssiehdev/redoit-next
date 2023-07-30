export namespace Habit {
  export type Status = "checked" | "skipped";

  export interface Definition {
    id: string;
    name: string;
    frequency: boolean[];
    completedDates: {
      [date: string]: Status;
    };
    createdAt: Date;
    updatedAt: Date;
    color: string;
    archived: boolean;
  }
}
