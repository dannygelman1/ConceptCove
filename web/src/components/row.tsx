import { Dispatch, SetStateAction, useState } from "react";
import { createImage, deleteConcept, updateConcept } from "@/lib/AppService";
import Image from "next/image";
import firebaseService from "@/lib/firebaseService";
import * as Dialog from "@radix-ui/react-dialog";
import { Concept } from "@/lib/types";
import cn from "classnames";
import { EditIcon } from "./editIcon";
import { TrashIcon } from "./trashIcon";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { firebaseStorage } from "@/lib/firebase";
import { SaveIcon } from "./saveIcon";
import { EscapeIcon } from "./escapeIcon";
import { ImageDialog } from "./imageDialog";

interface RowProps {
  concept: Concept;
  setConcepts: Dispatch<SetStateAction<Concept[]>>;
  editRowId: string;
  setEditRowId: Dispatch<SetStateAction<string>>;
  i: number;
  concepts: Concept[];
}

export const Row = ({
  concept,
  setConcepts,
  editRowId,
  setEditRowId,
  concepts,
  i,
}: RowProps) => {
  const [title, setTitle] = useState<string | undefined>(
    concept.title ?? "N/A"
  );
  const [artist, setArtist] = useState<string | undefined>(
    concept.artist ?? "N/A"
  );
  const [url, setUrl] = useState<string | undefined>(concept.url ?? "N/A");
  const [imageId, setImageId] = useState<string | undefined>(concept.image_id);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    concept.imageUrl
  );
  const [usingImage, setUsingImage] = useState<boolean>(true);

  return (
    <div className={cn("w-full group")}>
      <div
        className={cn(
          "flex flex-row space-x-10 h-24 items-center relative mx-24 px-14",
          {
            "rounded-b-md": (i + 1) % 4 == 0 || i == concepts.length - 1,
            "bg-slate-200": i % 2 === 0,
            "bg-slate-100": i % 2 === 1,
          }
        )}
      >
        {editRowId !== concept.id ? (
          <>
            <div className="w-1/4">
              <div className="w-[75px] h-[75px] shrink-0">
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Image
                      className="w-[75px] h-[75px] rounded object-cover"
                      src={imageUrl ?? "/pink.png"}
                      alt="Image"
                      width={75}
                      height={75}
                    />
                  </Dialog.Trigger>
                  <ImageDialog imageUrl={imageUrl ?? "/pink.png"} />
                </Dialog.Root>
              </div>
            </div>
            <div className="w-1/4 truncate">{title}</div>
            <div className="w-1/4 truncate">{artist}</div>
            <div className="w-1/4 truncate">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                {url}
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="w-1/4">
              <div className="flex flex-col items-start space-y-1">
                <input
                  type="file"
                  className="w-56 text-sm"
                  disabled={!usingImage}
                  onChange={async (event) => {
                    const files = event.target.files;
                    if (!files || files?.length === 0) return;
                    setFile(files[0]);
                  }}
                />
                <div className="text-xs">OR</div>
                <button
                  className="bg-slate-500/80 hover:bg-slate-500/90 text-slate-100 hover:text-white rounded-md p-2 text-xs"
                  onClick={() => {
                    setFile(undefined);
                    setUsingImage(!usingImage);
                  }}
                >
                  {usingImage ? "NO IMAGE" : "KEEP IMAGE"}
                </button>
              </div>
            </div>
            <div className="w-1/4 truncate">
              <input
                className="w-60 rounded-md outline-none"
                type="text"
                defaultValue={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="w-1/4 truncate">
              <input
                className="w-60 rounded-md outline-none"
                type="text"
                defaultValue={artist}
                onChange={(e) => {
                  setArtist(e.target.value);
                }}
              />
            </div>
            <div className="w-1/4 truncate">
              <input
                className="w-60 rounded-md outline-none"
                type="text"
                defaultValue={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
            </div>
          </>
        )}
        {editRowId !== concept.id ? (
          <>
            <div
              className="absolute -right-8 top-1/2 transform -translate-y-1/2 invisible group-hover:visible hover:bg-slate-300 rounded-md p-1"
              onClick={async () => {
                setEditRowId(concept.id);
                setTitle(title);
                setArtist(artist);
                setUrl(url);
                setImageId(imageId);
              }}
            >
              <EditIcon className="text-slate-800 hover:text-slate-300" />
            </div>
            <div
              className="absolute -right-14 top-1/2 transform -translate-y-1/2 invisible group-hover:visible hover:bg-slate-300 rounded-md p-1"
              onClick={() => {
                deleteConcept(concept.id);
                setConcepts((prev) => prev.filter((c) => concept.id !== c.id));
              }}
            >
              <TrashIcon className="text-slate-800 hover:text-slate-700" />
            </div>
          </>
        ) : (
          <>
            <div
              className="absolute -right-8 top-1/2 transform -translate-y-1/2 invisible group-hover:visible hover:bg-slate-300 rounded-md p-1"
              onClick={async () => {
                setEditRowId("");
                let newImageId = imageId;
                if (file) {
                  const lastDotIndex = file.name.lastIndexOf(".");
                  const fileName = file.name.substring(0, lastDotIndex);
                  const fileExtension = file.name.substring(lastDotIndex + 1);
                  const imageData = await createImage(fileName, fileExtension);
                  newImageId = imageData.createImage.id;
                  await firebaseService.uploadFile(newImageId, file);
                  const listRef = ref(firebaseStorage, newImageId);
                  const listUrls = await listAll(listRef);
                  if (listUrls.items.length > 0) {
                    const imageUrl = await getDownloadURL(listUrls.items[0]);
                    setImageUrl(imageUrl);
                  }
                }
                if (!usingImage) {
                  setImageUrl(undefined);
                  newImageId = undefined;
                }
                updateConcept({
                  id: concept.id,
                  title,
                  artist,
                  url,
                  imageId: newImageId,
                });
              }}
            >
              <SaveIcon className="text-slate-800 hover:text-slate-700" />
            </div>
            <div
              className="absolute -right-14 top-1/2 transform -translate-y-1/2 invisible group-hover:visible hover:bg-slate-300 rounded-md p-1"
              onClick={() => {
                setEditRowId("");
                setTitle(concept.title ?? "N/A");
                setArtist(concept.artist ?? "N/A");
                setUrl(concept.url ?? "N/A");
                setFile(undefined);
                setUsingImage(true);
              }}
            >
              <EscapeIcon className="text-slate-800 hover:text-slate-900" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface LoadingRowProps {
  rowNum: number;
}

export const LoadingRow = ({ rowNum }: LoadingRowProps) => {
  return (
    <div className={cn("w-full group")}>
      <div
        className={cn(
          "flex flex-row space-x-10 h-24 items-center relative mx-24 px-14 animate-pulse",
          {
            "rounded-b-md": (rowNum + 1) % 4 == 0 || rowNum == 3,
            "bg-slate-200/70": rowNum % 2 === 0,
            "bg-slate-100/70": rowNum % 2 === 1,
          }
        )}
      />
    </div>
  );
};
