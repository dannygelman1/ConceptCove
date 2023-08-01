import { createConcept, createImage } from "@/lib/AppService";
import firebaseService from "@/lib/firebaseService";
import * as Dialog from "@radix-ui/react-dialog";
import { ReactElement, useState } from "react";

export const InputForm = (): ReactElement => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-gray-400/30 fixed inset-0" />
      <Dialog.Content className="bg-white rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vh] max-w-[450px] max-h-[85vh] flex justify-center">
        <ConceptForm />
        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Portal>
  );
};

const ConceptForm = (): ReactElement => {
  const [title, setTitle] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [imageId, setImageId] = useState<string>("");
  return (
    <form
      className="p-4"
      onSubmit={async () => {
        if (firebaseService.currentUser)
          await createConcept(firebaseService.currentUser.id, {
            imageId,
            title,
            artist,
            url,
          });
      }}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col justify-between">
          <div className="text-xs text-black">Title</div>
          <div>
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="border-black border-2 rounded-md focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-xs text-black">Artist</div>
          <input
            onChange={(e) => {
              setArtist(e.target.value);
            }}
            className="border-black border-2 rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-xs text-black">Url</div>
          <input
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            className="border-black border-2 rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-xs text-black">Url</div>
          <input
            type="file"
            onChange={async (event) => {
              const files = event.target.files;
              if (!files || files?.length === 0) return;
              const lastDotIndex = files[0].name.lastIndexOf(".");
              const fileName = files[0].name.substring(0, lastDotIndex);
              const fileExtension = files[0].name.substring(lastDotIndex + 1);
              const imageData = await createImage(fileName, fileExtension);
              firebaseService.uploadFile(imageData.createImage.id, files[0]);
              setImageId(imageData.createImage.id);
            }}
          />
        </div>
      </div>

      <button className="p-2 text-black bg-gray-300 mt-4" type="submit">
        Post concept
      </button>
    </form>
  );
};
