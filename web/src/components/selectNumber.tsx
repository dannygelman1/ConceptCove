import * as Select from "@radix-ui/react-select";
import { Dispatch, ReactElement, SetStateAction, useRef } from "react";
import Image from "next/image";
import { CaretIcon } from "./caretIcon";

interface SelectNumberProps {
  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
}
export const SelectNumber = ({
  rowsPerPage,
  setRowsPerPage,
}: SelectNumberProps): ReactElement => {
  return (
    <Select.Root
      defaultValue={rowsPerPage.toString()}
      onValueChange={(value) => {
        setRowsPerPage(parseInt(value));
      }}
    >
      <Select.Trigger className="px-2 py-1 justify-between rounded-lg bg-[#8390a2] text-white flex flex-row items-center text-xs outline-none select-none">
        <Select.Value />
        <Select.Icon className="flex items-center justify-center">
          <CaretIcon className="text-white" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport className="p-1 rounded-lg bg-[#8390a2] text-white text-xs cursor-default select-none">
          <Select.Item
            value="4"
            className="text-black/70 py-1 px-1 flex text-white hover:bg-[#738296] rounded-md outline-none"
          >
            <Select.ItemText>4</Select.ItemText>
          </Select.Item>
          <Select.Item
            value="6"
            className="text-black/70 py-1 px-1 text-white flex rounded-md hover:bg-[#738296] outline-none"
          >
            <Select.ItemText>6</Select.ItemText>
          </Select.Item>
          <Select.Item
            value="8"
            className="text-black/70 py-1 px-1 text-white flex rounded-md hover:bg-[#738296] outline-none"
          >
            <Select.ItemText>8</Select.ItemText>
          </Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
};
