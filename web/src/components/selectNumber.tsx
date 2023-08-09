import * as Select from "@radix-ui/react-select";
import { Dispatch, ReactElement, SetStateAction, useRef } from "react";
import Image from "next/image";
import { EscapeIcon } from "./escapeIcon";

interface SelectNumberProps {
  setRowsPerPage: Dispatch<SetStateAction<number>>;
}
export const SelectNumber = ({
  setRowsPerPage,
}: SelectNumberProps): ReactElement => {
  return (
    <Select.Root
      defaultValue="4"
      onValueChange={(value) => {
        setRowsPerPage(parseInt(value));
      }}
    >
      <Select.Trigger className="px-2 py-1 justify-between rounded-lg bg-slate-400 text-black/70 flex flex-row items-center text-xs cursor-default select-none outline-none antialiased">
        <Select.Value />
        <Select.Icon>
          <EscapeIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport className="p-1 rounded-lg bg-slate-400 text-xs cursor-default select-none antialiased">
          <Select.Item
            value="4"
            className="text-black/70 py-1 hover:text-black rounded-lg hover:bg-slate-400 outline-none"
          >
            <Select.ItemText className="text-black pl-4">4</Select.ItemText>
          </Select.Item>
          <Select.Item
            value="6"
            className="text-black/70 py-1 hover:text-black rounded-lg hover:bg-slate-400 outline-none"
          >
            <Select.ItemText className="text-black pl-4">6</Select.ItemText>
          </Select.Item>
          <Select.Item
            value="8"
            className="text-black/70 py-1 hover:text-black rounded-lg hover:bg-slate-400 outline-none"
          >
            <Select.ItemText className="text-black pl-4">8</Select.ItemText>
          </Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
};
