import * as Dialog from "@radix-ui/react-dialog";

import * as Form from "@radix-ui/react-form";
import React, { useState } from "react";

import { CrossIcon } from "@/components/icons";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useHabitStore } from "@/store/habits";
import type { Habit } from "@/types/habit-types";
import clsx from "clsx";
import { useImmerReducer } from "use-immer";
import { ArchivedToggle } from "./ArchivedToggle";
import { ColorSelector } from "./ColorSelector";
import { FrequencySelector } from "./FrequencySelector";

const emptyHabit = {
  name: "",
  color: "#debd8f",
  frequency: Array(7).fill(true),
  archived: false,
};

type State = Pick<Habit.Definition, keyof typeof emptyHabit>;

type Action =
  | { type: "UPDATE_NAME"; value: string }
  | { type: "UPDATE_COLOR"; value: string }
  | { type: "UPDATE_FREQUENCY"; value: boolean[] }
  | { type: "UPDATE_ARCHIVED"; value: boolean }
  | { type: "RESET"; value?: typeof emptyHabit };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "UPDATE_NAME":
      state.name = action.value;
      return state;
    case "UPDATE_COLOR":
      state.color = action.value;
      return state;
    case "UPDATE_FREQUENCY":
      state.frequency = action.value;
      return state;
    case "RESET":
      if (action.value) {
        return action.value;
      }
      return {
        name: "",
        color: "#debd8f",
        frequency: Array(7).fill(true),
        archived: false,
      };
    case "UPDATE_ARCHIVED":
      state.archived = action.value;
      return state;
    default:
      // @ts-expect-error Property 'type' does not exist on type 'never'.
      throw new Error(`Invalid action type: ${action?.type}`);
  }
}

const DialogDemo2 = ({
  id,
  onSave,
  children,
}: {
  id?: string;
  onSave: (payload: Partial<Habit.Definition>) => void;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const habit = useHabitStore((state) => (id ? state.habits[id] : emptyHabit));

  const { color, name, frequency, archived } = habit;

  const deleteHabit = useHabitStore((state) => state.deleteHabit);

  const [state, dispatch] = useImmerReducer(reducer, {
    color,
    name,
    frequency,
    archived,
  });

  const handleSave = () => {
    setOpen(false);
    onSave(state);
  };

  const handleReset = (v: boolean) => {
    setOpen(v);
    if (id) {
      dispatch({ type: "RESET", value: { color, name, frequency, archived } });
      return;
    }
    dispatch({ type: "RESET" });
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleReset}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/50" />
        <Dialog.Content
          className={clsx(
            "fixed z-50",
            "w-[95vw] max-w-[400px] rounded-lg p-4 md:w-full",
            "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
            "bg-white",
            "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          )}
        >
          <Dialog.Title className="text-2xl font-medium text-gray-900">
            {id ? "Edit Habit" : "Add Habit"}
          </Dialog.Title>
          <Form.Root
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <Form.Field name="Habit Name">
              <Form.Label className="text-lg py-2 font-medium text-gray-700">
                Name
              </Form.Label>
              <Form.Control asChild>
                <Input
                  maxLength={20}
                  required
                  className={clsx("mt-1  w-full box-border")}
                  value={state.name}
                  onChange={({ target }) =>
                    dispatch({ type: "UPDATE_NAME", value: target.value })
                  }
                />
              </Form.Control>
              <Form.Message match="valueMissing">
                Please provide a valid name
              </Form.Message>
              <Form.Message match="tooLong">Ey Vey</Form.Message>
            </Form.Field>
            <div>
              <label
                htmlFor="name"
                className="text-lg py-2 font-medium text-gray-700 inline-block"
              >
                Color
              </label>

              <ColorSelector
                updateColor={(value) =>
                  dispatch({ type: "UPDATE_COLOR", value })
                }
                selectedColor={state.color || emptyHabit.color}
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="text-lg py-2 font-medium text-gray-700 inline-block"
              >
                Frequency
              </label>

              <FrequencySelector
                updateFrequency={(value) =>
                  dispatch({ type: "UPDATE_FREQUENCY", value })
                }
                frequency={state.frequency}
              />
            </div>

            {id && (
              <>
                <fieldset className="mt-4">
                  <ArchivedToggle
                    setIsArchived={(v) =>
                      dispatch({ type: "UPDATE_ARCHIVED", value: v })
                    }
                    isArchived={state.archived}
                  />
                </fieldset>
              </>
            )}
            <div className="flex mt-5 justify-between items-center">
              {id && (
                <Button color="red" size="sm" onClick={() => deleteHabit(id)}>
                  Delete Habit
                </Button>
              )}
              <Dialog.Close asChild></Dialog.Close>
              <Form.Submit asChild>
                <Button type="submit" color="green" className="ml-auto">
                  {id ? "Update Habit" : "Add Habit"}
                </Button>
              </Form.Submit>
            </div>
          </Form.Root>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <CrossIcon className="h-3 text-black" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDemo2;
