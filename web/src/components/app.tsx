import { ReactElement, useEffect, useState } from "react";
import { createUser, findUser } from "@/lib/AppService";
import firebaseService from "@/lib/firebaseService";
import * as Dialog from "@radix-ui/react-dialog";
import { InputForm } from "./inputForm";
import { User } from "@/models/user";
import { Concept } from "@/lib/types";
import { FullTable } from "./table";

export const App = (): ReactElement => {
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
    <div className="absolute bg-white flex flex-col justify-start w-full h-full grow">
      <div className="flex space-x-5 justify-end p-4">
        {user && (
          <Dialog.Root>
            <Dialog.Trigger>
              <div className="font-light text-lg hover:text-slate-500">
                CREATE
              </div>
            </Dialog.Trigger>
            <InputForm />
          </Dialog.Root>
        )}
        {user ? (
          <span className="font-light text-lg">{user.name.toUpperCase()}</span>
        ) : (
          <button
            className="font-light text-lg hover:text-slate-500"
            onClick={async () => {
              await firebaseService.signInWithPopup();
            }}
          >
            LOGIN/SIGNUP
          </button>
        )}
        <button
          className="font-light text-lg hover:text-slate-500"
          onClick={async () => {
            await firebaseService.signOut();
          }}
        >
          LOGOUT
        </button>
      </div>
      <FullTable concepts={concepts} setConcepts={setConcepts} />
    </div>
  );
};
