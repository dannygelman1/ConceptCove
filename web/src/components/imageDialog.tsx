import * as Dialog from "@radix-ui/react-dialog";
import { ReactElement, useRef } from "react";
import Image from "next/image";
import { EscapeIcon } from "./escapeIcon";

interface ImageDialogProps {
  imageUrl: string;
}
export const ImageDialog = ({ imageUrl }: ImageDialogProps): ReactElement => {
  const dialogCloseRef = useRef<HTMLButtonElement | null>(null);
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-gray-400/60 fixed inset-0" />
      <Dialog.Content className="bg-white rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center h-4/5 w-4/5">
        <Dialog.Close ref={dialogCloseRef}>
          <div className="flex justify-end">
            <div
              className="pr-8 -mt-8"
              onClick={() => {
                dialogCloseRef.current?.click();
              }}
            >
              <EscapeIcon />
            </div>
          </div>
        </Dialog.Close>
        <div
          className="relative"
          style={{
            width: "90vw",
            height: "90vh",
            margin: "0 auto",
            maxWidth: "80%", // Set maximum width to 80% of the container
            maxHeight: "80%", // Set maximum height to 80% of the container
          }}
        >
          <Image
            className="object-contain fixed"
            src={imageUrl ?? "/pink.png"}
            alt="Image"
            fill={true}
          />
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
