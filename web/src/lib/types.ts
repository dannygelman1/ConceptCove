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
