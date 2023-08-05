import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  createImage,
  createUser,
  deleteConcept,
  findUser,
  getConcept,
  updateConcept,
} from "@/lib/AppService";
import Image from "next/image";
import firebaseService from "@/lib/firebaseService";
import * as Dialog from "@radix-ui/react-dialog";
import { InputForm } from "./inputForm";
import { User } from "@/models/user";
import { Concept } from "@/lib/types";
import cn from "classnames";
import { EditIcon } from "./editIcon";
import { TrashIcon } from "./trashIcon";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { firebaseStorage } from "@/lib/firebase";

interface RowProps {
  concept: Concept;
  setConcepts: Dispatch<SetStateAction<Concept[]>>;
  editRowId: string;
  setEditRowId: Dispatch<SetStateAction<string>>;
  i: number;
}

export const Row = ({
  concept,
  setConcepts,
  editRowId,
  setEditRowId,
  i,
}: RowProps) => {
  const [title, setTitle] = useState<string | undefined>(concept.title);
  const [artist, setArtist] = useState<string | undefined>(concept.artist);
  const [url, setUrl] = useState<string | undefined>(concept.url);
  const [imageId, setImageId] = useState<string | undefined>(concept.image_id);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    concept.imageUrl
  );
  const [usingImage, setUsingImage] = useState<boolean>(true);

  return (
    <div className="w-full group">
      <div
        className={cn(
          "flex flex-row space-x-10 h-24 items-center relative mx-24 px-14",
          {
            "bg-slate-200": i % 2 === 0,
            "bg-slate-100": i % 2 === 1,
          }
        )}
      >
        {editRowId !== concept.id ? (
          <>
            <div className="w-1/4">
              <div className="w-[75px] h-[75px] shrink-0">
                <Image
                  className="w-[75px] h-[75px] rounded object-cover"
                  src={imageUrl ?? "/pink.png"}
                  alt="Image"
                  width={75}
                  height={75}
                />
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
              <div>select new to replace</div>
              <input
                type="file"
                disabled={!usingImage}
                className="w-56 text-sm"
                onChange={async (event) => {
                  const files = event.target.files;
                  if (!files || files?.length === 0) return;
                  setFile(files[0]);
                }}
              />
              <div
                className="relative w-[50px] h-[50px] rounded"
                style={{ overflow: "hidden" }}
              >
                <Image
                  sizes="(max-width: 75px) 100vw"
                  src={imageUrl ?? "/pink.png"}
                  alt="Image"
                  objectFit="cover"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="w-1/4 truncate">
              <input
                className="w-60"
                type="text"
                defaultValue={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="w-1/4 truncate">
              <input
                className="w-60"
                type="text"
                defaultValue={artist}
                onChange={(e) => {
                  setArtist(e.target.value);
                }}
              />
            </div>
            <div className="w-1/4 truncate">
              <input
                className="w-60"
                type="text"
                defaultValue={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
            </div>
          </>
        )}
        <div
          className="absolute -right-6 top-1/2 transform -translate-y-1/2 invisible group-hover:visible"
          onClick={async () => {
            if (editRowId !== concept.id) {
              setEditRowId(concept.id);
              setTitle(title);
              setArtist(artist);
              setUrl(url);
              setImageId(imageId);
            } else {
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
              updateConcept({
                id: concept.id,
                title,
                artist,
                url,
                imageId: newImageId,
              });
            }
          }}
        >
          <EditIcon />
        </div>
        <div
          className="absolute -right-12 top-1/2 transform -translate-y-1/2 invisible group-hover:visible"
          onClick={() => {
            deleteConcept(concept.id);
            setConcepts((prev) => prev.filter((c) => concept.id !== c.id));
          }}
        >
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};
