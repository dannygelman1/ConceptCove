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
  i: number;
  setConcepts: Dispatch<SetStateAction<Concept[]>>;
}

export const Row = ({ concept, i, setConcepts }: RowProps): ReactElement => {
  const [editRowId, setEditRowId] = useState<string>("");
  const [title, setTitle] = useState<string | undefined>(concept.title);
  const [artist, setArtist] = useState<string | undefined>(concept.artist);
  const [url, setUrl] = useState<string | undefined>(concept.url);
  const [imageId, setImageId] = useState<string | undefined>(concept.image_id);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    concept.imageUrl
  );
  const [usingImage, setUsingImage] = useState<boolean>(true);

  return editRowId !== concept.id ? (
    <tr
      key={i}
      className={cn("max-w-[800px]", {
        "bg-slate-200": i % 2 === 0,
        "bg-slate-100": i % 2 === 1,
      })}
    >
      <td className="p-4 text-center flex items-center justify-center">
        <div
          className="relative w-[75px] h-[75px] rounded"
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
      </td>
      <td className="p-4 text-center truncate">{title}</td>
      <td className="p-4 text-center truncate">{artist}</td>
      <td className="p-4 text-center truncate">
        <a href="link-url">{url}</a>
      </td>
      <td
        className="p-4 justify-center items-center"
        onClick={() => {
          setEditRowId(concept.id);
          setTitle(concept.title);
          setArtist(concept.artist);
          setUrl(concept.url);
          setImageId(concept.image_id);
        }}
      >
        <EditIcon />
      </td>
      <td
        className="p-4 justify-center items-center"
        onClick={() => {
          deleteConcept(concept.id);
          setConcepts((prev) => prev.filter((c) => concept.id !== c.id));
        }}
      >
        <TrashIcon />
      </td>
    </tr>
  ) : (
    <tr
      key={i}
      className={cn("max-w-[800px]", {
        "bg-slate-200": i % 2 === 0,
        "bg-slate-100": i % 2 === 1,
      })}
    >
      <td className="p-4 text-center flex items-center justify-center">
        <div className="flex flex-col space-x-2 items-center">
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
      </td>
      <td className="p-4 text-center items-center">
        <input
          className="text-center w-20"
          type="text"
          defaultValue={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </td>
      <td className="p-4 text-center items-center">
        <input
          className="text-center w-20"
          type="text"
          defaultValue={artist}
          onChange={(e) => {
            setArtist(e.target.value);
          }}
        />
      </td>
      <td className="p-4 text-center items-center">
        <input
          className="text-center w-20"
          type="text"
          defaultValue={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </td>
      <td className="p-4 justify-center items-center">
        <button
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
            updateConcept({
              id: concept.id,
              title,
              artist,
              url,
              imageId: newImageId,
            });
          }}
        >
          <EditIcon />
        </button>
      </td>
      <td className="p-4 justify-center items-center">
        <TrashIcon />
      </td>
    </tr>
  );
};
