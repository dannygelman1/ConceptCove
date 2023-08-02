import { ReactElement, useEffect, useState } from "react";
import { createUser, findUser, getConcept } from "@/lib/AppService";
import Image from "next/image";
import firebaseService from "@/lib/firebaseService";
import * as Dialog from "@radix-ui/react-dialog";
import { InputForm } from "./inputForm";
import { User } from "@/models/user";
import { Concept } from "@/lib/types";

interface TableProps {}

export const Table = ({}: TableProps): ReactElement => {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const findConceptsAndUser = firebaseService.auth.onAuthStateChanged(
      async (authUser) => {
        if (authUser?.email && authUser?.uid) {
          const userData = await findUser(authUser.email, authUser.uid);
          let user = userData?.findUser;
          if (!userData?.findUser) {
            const userData = await createUser(
              authUser.email,
              authUser.email,
              authUser.uid
            );
            user = userData.createUser;
          }
          if (user) {
            firebaseService.user = new User({
              id: user.id,
              name: user.name,
              email: user.email,
              firebase_id: user.firebase_id,
            });
            setUser(firebaseService.currentUser);
          }
          const concepts = await firebaseService.currentUser?.getConcepts();
          console.log(concepts);
          setConcepts(concepts ?? []);
        } else {
          firebaseService.user = undefined;
          setUser(undefined);
          setConcepts([]);
        }
      }
    );
    return () => findConceptsAndUser(); // unsubscribing from the listener when the component is unmounting.
  }, []);

  return (
    <div className="bg-green-200 absolute flex flex-col justify-center w-full">
      <div className="flex space-x-5 justify-end p-4">
        {user && (
          <Dialog.Root>
            <Dialog.Trigger>
              <div>create</div>
            </Dialog.Trigger>
            <InputForm />
          </Dialog.Root>
        )}
        {user ? (
          <span>{user.name}</span>
        ) : (
          <button
            onClick={async () => {
              await firebaseService.signInWithPopup();
            }}
          >
            login/signup
          </button>
        )}
        <button
          onClick={async () => {
            await firebaseService.signOut();
          }}
        >
          logout
        </button>
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="font-bold text-2xl text-center p-16">Concept Cove</h1>
        <table className="border-separate border-spacing-4 px-20 border-red-100 outline-1">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Artist</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {concepts.map((concept, i) => (
              <tr key={i}>
                <td className="p-4 text-center">
                  <Image
                    className="w-[300px] h-[200px] object-contain"
                    src={concept.imageUrl ?? "/pink.png"}
                    alt="Image"
                    width={300}
                    height={200}
                  />
                </td>
                <td className="p-4 text-center">{concept.title}</td>
                <td className="p-4 text-center">{concept.artist}</td>
                <td className="p-4 text-center">
                  <a href="link-url">{concept.url}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
