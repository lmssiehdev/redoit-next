import * as Dialog from "@radix-ui/react-dialog";

import React, { useReducer, useState } from "react";
import * as Form from "@radix-ui/react-form";

import { CrossIcon } from "@/app/component/Icons";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useHabitStore } from "@/store/habits";
import type { Habit } from "@/types/habitTypes";
import clsx from "clsx";
import { ArchivedToggle } from "./ArchivedToggle";
import { ColorSelector } from "./ColorSelector";
import { FrequencySelector } from "./FrequencySelector";

const emptyHabit = {
  name: "",
  color: "#debd8f",
  frequency: Array(7).fill(true),
  archived: false,
};

type HabitAction =
  | { type: "name"; value: string }
  | { type: "color"; value: string }
  | { type: "frequency"; value: boolean[] }
  | { type: "archived"; value: boolean }
  | { type: "reset"; value?: typeof emptyHabit };

function habitReducer(state: Partial<Habit.Definition>, action: HabitAction) {
  switch (action.type) {
    case "name":
      return {
        ...state,
        name: action.value,
      };
    case "color":
      return {
        ...state,
        color: action.value,
      };
    case "frequency":
      return {
        ...state,
        frequency: action.value,
      };
    case "archived":
      return {
        ...state,
        archived: action.value,
      };
    case "reset":
      if (action.value) {
        return action.value;
      }
      return {
        name: "",
        color: "#debd8f",
        frequency: Array(7).fill(true),
      };
    case "archived":
      return {
        ...state,
        archived: action.value,
      };
    default:
      // @ts-expect-error Property 'type' does not exist on type 'never'.
      throw new Error(`Invalid action type: ${action?.type}`);
  }
}

const DialogDemo2 = ({
  id,
  onClose,
  children,
}: {
  id?: string;
  onClose: (payload: Partial<Habit.Definition>) => void;
  children: React.ReactNode;
}) => {
  const { color, name, frequency, archived } = useHabitStore((state) =>
    id ? state.habits[id] : emptyHabit
  );
  const editHabit = useHabitStore((state) => state.editHabit);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);

  const [state, dispatch] = useReducer(habitReducer, {
    color,
    name,
    frequency,
    archived,
  });

  const handleClose = () => {
    onClose(state);
    return;
  };

  const handleSave = () => {
    if (id) {
      editHabit(id, state);
    } else onClose(state);
  };

  const handleReset = () => {
    if (id) {
      dispatch({ type: "reset", value: { color, name, frequency, archived } });
      return;
    }
    dispatch({ type: "reset" });
  };

  const handleDelete = () => {
    if (id) deleteHabit(id);
  };

  return (
    <Dialog.Root onOpenChange={handleReset}>
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
          {/* <Dialog.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
            {"Make changes to your profile here. Click save when you're done."}
          </D
           </Form.Root>ialog.Description> */}
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({ type: "name", value: e.target.value })
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
                updateColor={(value) => dispatch({ type: "color", value })}
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
                  dispatch({ type: "frequency", value })
                }
                frequency={state.frequency || emptyHabit.frequency}
              />
            </div>

            {id && (
              <>
                <fieldset className="mt-4">
                  <ArchivedToggle
                    setIsArchived={(v) =>
                      dispatch({ type: "archived", value: v })
                    }
                    // @ts-expect-error
                    isArchived={state.archived}
                  />
                </fieldset>
              </>
            )}
            <div className="flex mt-5 justify-between items-center">
              {id && (
                <Button color="red" size="sm" onClick={() => handleDelete()}>
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
