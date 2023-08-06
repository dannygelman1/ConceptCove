import { createConcept, createImage } from "@/lib/AppService";
import firebaseService from "@/lib/firebaseService";
import * as Dialog from "@radix-ui/react-dialog";
import { ReactElement, useState } from "react";
import cn from "classnames";

export const InputForm = (): ReactElement => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-gray-400/60 fixed inset-0" />
      <Dialog.Content className="bg-white rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vh] max-w-[450px] max-h-[85vh] flex justify-center">
        <ConceptForm />
        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Portal>
  );
};

const ConceptForm = (): ReactElement => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [artist, setArtist] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [imageId, setImageId] = useState<string | undefined>(undefined);
  const [usingImage, setUsingImage] = useState<boolean>(true);
  return (
    <form
      className="p-4 w-[400px]"
      onSubmit={async (event) => {
        event.preventDefault();
        if (firebaseService.currentUser) {
          await createConcept(firebaseService.currentUser.id, {
            imageId,
            title,
            artist,
            url,
          });
          window.location.reload();
        }
      }}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col justify-between">
          <div className="text-xs text-black">TITLE</div>
          <div>
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="border-slate-600 border-2 rounded-md focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-xs text-black">ARTIST</div>
          <input
            onChange={(e) => {
              setArtist(e.target.value);
            }}
            className="border-slate-600 border-2 rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-xs text-black">URL</div>
          <input
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            className="border-slate-600 border-2 rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-xs text-black">IMAGE</div>
          <div className="flex flex-row space-x-2 w-full items-center">
            <input
              type="file"
              disabled={!usingImage}
              className="w-56 text-xs"
              onChange={async (event) => {
                const files = event.target.files;
                if (!files || files?.length === 0) return;
                const lastDotIndex = files[0].name.lastIndexOf(".");
                const fileName = files[0].name.substring(0, lastDotIndex);
                const fileExtension = files[0].name.substring(lastDotIndex + 1);
                const imageData = await createImage(fileName, fileExtension);
                await firebaseService.uploadFile(
                  imageData.createImage.id,
                  files[0]
                );
                setImageId(imageData.createImage.id);
              }}
            />
            <button
              type="button"
              className="bg-slate-500/80 hover:bg-slate-500/90 text-slate-100 hover:text-white rounded-md p-2 text-xs"
              onClick={() => {
                setUsingImage(!usingImage);
              }}
            >
              {usingImage ? "NO IMAGE" : "KEEP IMAGE"}
            </button>
          </div>
        </div>
      </div>

      <button
        className={cn(
          "bg-slate-500/80 hover:bg-slate-500/90 text-slate-100 hover:text-white rounded-md p-2 text-xs mt-4 disabled:bg-slate-200 disabled:text-slate-400",
          {
            "bg-gray-100 text-gray-300": Boolean(
              !title || !artist || !url || (!imageId && usingImage)
            ),
            "bg-gray-500 hover:bg-gray-400 text-black": Boolean(
              title && artist && url && (imageId || !usingImage)
            ),
          }
        )}
        type="submit"
        disabled={Boolean(
          !title || !artist || !url || (!imageId && usingImage)
        )}
      >
        POST CONCEPT
      </button>
    </form>
  );
};
