import * as Dialog from "@radix-ui/react-dialog";
import { ReactElement } from "react";
import Image from "next/image";
import { EscapeIcon } from "./escapeIcon";

interface ImageDialogProps {
  imageUrl: string;
}
export const ImageDialog = ({ imageUrl }: ImageDialogProps): ReactElement => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-gray-400/60 fixed inset-0" />
      <Dialog.Content className="rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center">
        {/* <div className="flex justify-end p-2">
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <EscapeIcon />
            </button>
          </Dialog.Close>
        </div> */}
        <div
          className="relative"
          style={{
            width: "80vw",
            height: "80vh",
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
