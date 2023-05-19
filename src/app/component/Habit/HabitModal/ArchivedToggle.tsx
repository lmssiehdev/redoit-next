import * as Toggle from "@radix-ui/react-toggle";
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
      <Toggle.Root
        onPressedChange={setIsArchived}
        aria-label="Toggle Archive Habit"
        asChild
      >
        {/* {isArchived ? "checked" : "unchecked"} */}
        <>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">Archive</label>
        </>
      </Toggle.Root>
    </>
  );
};
