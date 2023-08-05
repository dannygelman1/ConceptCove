import { ReactElement, useEffect, useState } from "react";
import { createUser, findUser } from "@/lib/AppService";
import firebaseService from "@/lib/firebaseService";
import * as Dialog from "@radix-ui/react-dialog";
import { InputForm } from "./inputForm";
import { User } from "@/models/user";
import { Concept } from "@/lib/types";
import { Row } from "./row";

interface TableProps {}

export const Table = ({}: TableProps): ReactElement => {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [editRowId, setEditRowId] = useState<string>("");
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [artist, setArtist] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [imageId, setImageId] = useState<string | undefined>(undefined);

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
    <div className="bg-white absolute flex flex-col justify-start w-full h-full pb-10">
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
      <div className="flex flex-col space-y-4 items-center">
        <h1 className="font-thin text-4xl text-center p-5">CONCEPT COVE</h1>
        <table className="border-collapse px-20 table-fixed mx-20">
          <thead className="bg-slate-300">
            <tr>
              <th className="w-[400px] font-thin text-2xl">IMAGE</th>
              <th className="w-[400px] font-thin text-2xl">NAME</th>
              <th className="w-[400px] font-thin text-2xl">ARTIST</th>
              <th className="w-[400px] font-thin text-2xl">LINK</th>
              <th className="w-[400px] font-thin text-2xl">EDIT</th>
              <th className="w-[400px] font-thin text-2xl">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {concepts
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((concept, i) => {
                return (
                  i >= (pageNumber - 1) * 4 &&
                  i < (pageNumber - 1) * 4 + 4 && (
                    <Row i={i} setConcepts={setConcepts} concept={concept} />
                  )
                );
              })}
          </tbody>
        </table>
        <div className="flex flex-row space-x-2 items-center">
          <button
            className="bg-gray-500 rounded-sm p-2 disabled:bg-slate-300"
            onClick={() => {
              setPageNumber((prev) => prev - 1);
            }}
            disabled={pageNumber <= 1}
          >
            PREVIOUS
          </button>
          <span>{pageNumber}</span>
          <button
            className="bg-gray-500 rounded-sm p-2  disabled:bg-slate-300"
            onClick={() => {
              setPageNumber((prev) => prev + 1);
            }}
            disabled={pageNumber >= Math.ceil(concepts.length / 4)}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};
