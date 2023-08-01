import { ReactElement, useEffect, useState } from "react";
import {
  createConcept,
  createImage,
  createUser,
  findUser,
  getConcept,
  getConceptsByEmail,
} from "@/lib/AppService";
import Image from "next/image";
import firebaseService from "@/lib/firebaseService";
import * as Dialog from "@radix-ui/react-dialog";
import { InputForm } from "./inputForm";
import { User } from "@/models/user";
import { Concept, test2 } from "@/lib/types";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { firebaseStorage } from "@/lib/firebase";

interface TableProps {}

export const Table = ({}: TableProps): ReactElement => {
  const [concepts, setConcepts] = useState<Concept[]>([]);

  useEffect(() => {
    const findConceptsAndUser = firebaseService.auth.onAuthStateChanged(
      async (user) => {
        if (user?.email && user?.uid) {
          const userData = await findUser(user.email, user.uid);
          if (!userData?.findUser) {
            const userData = await createUser(user.email, user.email, user.uid);
            firebaseService.user = new User({
              id: userData.createUser.id,
              name: userData.createUser.name,
              email: userData.createUser.email,
              firebase_id: userData.createUser.firebase_id,
            });
          } else {
            firebaseService.user = new User({
              id: userData.findUser.id,
              name: userData.findUser.name,
              email: userData.findUser.email,
              firebase_id: userData.findUser.firebase_id,
            });
          }
          const concepts = await firebaseService.currentUser?.getConcepts();
          console.log(concepts);
          setConcepts(concepts ?? []);
        }
      }
    );
    return () => findConceptsAndUser(); // unsubscribing from the listener when the component is unmounting.
  }, []);

  return (
    <div className="bg-green-200 absolute flex flex-col justify-center w-full">
      <h1 className="font-bold text-2xl text-center p-16">Concept Cove</h1>
      <table className="border-separate border-spacing-4 px-20">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Artist</th>
            <th>Link</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {concepts.map((concept, i) => (
            <tr key={i}>
              <td className="p-4 text-center">
                <img src={concept.imageUrl} alt="Image" />
              </td>
              <td className="p-4 text-center">{concept.title}</td>
              <td className="p-4 text-center">{concept.artist}</td>
              <td className="p-4 text-center">
                <a href="link-url">{concept.url}</a>
              </td>
              <td className="p-4 text-center">Tag 1, Tag 2, Tag 3</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex space-x-5">
        <Dialog.Root>
          <Dialog.Trigger>
            <div>create</div>
          </Dialog.Trigger>
          <InputForm />
        </Dialog.Root>
        <button
          onClick={async () => {
            await getConcept("5788cea0-66c9-4292-9cab-db9d57ba0cfc");
          }}
        >
          get
        </button>
        <button
          onClick={async () => {
            await firebaseService.signInWithPopup();
          }}
        >
          login/signup
        </button>
        <button
          onClick={async () => {
            await firebaseService.signOut();
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
};
