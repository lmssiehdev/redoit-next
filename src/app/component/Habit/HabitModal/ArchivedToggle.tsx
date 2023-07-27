import * as Toggle from "@radix-ui/react-toggle";
import * as Switch from "@radix-ui/react-switch";
import React from "react";

export const ArchivedToggle = ({
  isArchived,
  setIsArchived,
}: {
  isArchived: boolean;
  setIsArchived: (v: boolean) => void;
}) => {
  return (
    <>
      <input
        type="checkbox"
        id="checkbox"
        className="hidden"
        defaultChecked={isArchived}
      />
      <Switch.Root
        defaultChecked={isArchived}
        checked={isArchived}
        onCheckedChange={setIsArchived}
        aria-label="Toggle Archive Habit"
        asChild
      >
        <Switch.Thumb asChild>
          <label htmlFor="checkbox">Archive</label>
        </Switch.Thumb>
      </Switch.Root>
    </>
  );
};
