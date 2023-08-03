import { ReactElement, useEffect, useState } from "react";
import { createUser, findUser, getConcept } from "@/lib/AppService";
import Image from "next/image";
import firebaseService from "@/lib/firebaseService";
import * as Dialog from "@radix-ui/react-dialog";
import { InputForm } from "./inputForm";
import { User } from "@/models/user";
import { Concept } from "@/lib/types";
import cn from "classnames";

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
    <div className="bg-white absolute flex flex-col justify-center w-full pb-10">
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
      <div className="flex flex-col space-y-4">
        <h1 className="font-thin text-4xl text-center p-10">CONCEPT COVE</h1>
        <table className="border-collapse px-20 table-fixed mx-20">
          <thead className={"bg-slate-300"}>
            <tr>
              <th className="w-[400px]  font-thin text-2xl">IMAGE</th>
              <th className="w-[400px]  font-thin text-2xl">NAME</th>
              <th className="w-[400px]  font-thin text-2xl">ARTIST</th>
              <th className="w-[400px]  font-thin text-2xl">LINK</th>
            </tr>
          </thead>
          <tbody className="">
            {concepts.map((concept, i) => (
              <tr
                key={i}
                className={cn({
                  "bg-slate-200": i % 2 === 0,
                  "bg-slate-100": i % 2 === 1,
                })}
              >
                <td className="p-4 text-center flex items-center justify-center ">
                  <div
                    className="relative w-[75px] h-[75px] rounded"
                    style={{ overflow: "hidden" }}
                  >
                    <Image
                      src={concept.imageUrl ?? "/pink.png"}
                      alt="Image"
                      // width={200}
                      // height={200}
                      objectFit="cover"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </td>
                <td className="p-4 text-center ">{concept.title}</td>
                <td className="p-4 text-center ">{concept.artist}</td>
                <td className="p-4 text-center ">
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
