import { getDownloadURL, listAll, ref } from "firebase/storage";
import { firebaseStorage } from "@/lib/firebase";
import { Dispatch, SetStateAction } from "react";

export interface UserType {
  id: string;
  name: string;
  email: string;
  firebase_id: string;
}

export type Concept = {
  id: string;
  image_id?: string;
  title?: string;
  artist?: string;
  url?: string;
  imageUrl?: string;
  owner_id: string;
};

export type ConceptInput = {
  imageId?: string;
  title?: string;
  artist?: string;
  url?: string;
};

export const test = (setUrl: Dispatch<SetStateAction<string>>) => {
  const listRef = ref(firebaseStorage, "ec933798-efaa-496b-ba29-efae3338e12d");
  listAll(listRef).then((res) => {
    res.items.forEach(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      console.log(url);
      setUrl(url);
    });
  });
};

export const test2 = async (setUrl: Dispatch<SetStateAction<string>>) => {
  const listRef = ref(firebaseStorage, "0ba70250-2a8c-4b13-b6be-eda17be79963");
  const listUrls = await listAll(listRef);
  console.log(" TESSTTTT listUrls.items", listUrls.items);
  const imageUrl = await getDownloadURL(listUrls.items[0]);
  setUrl(imageUrl);
};
