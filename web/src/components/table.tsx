import { ReactElement, useEffect, useState } from "react";
import {
  createConcept,
  createUser,
  findUser,
  getConcept,
  getConceptsByEmail,
} from "@/lib/AppService";
import { Concept } from "@/lib/gqlClient";
import firebaseService from "@/lib/firebaseService";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { firebaseStorage } from "@/lib/firebase";
import Image from "next/image";

interface TableProps {}

export const Table = ({}: TableProps): ReactElement => {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [urlImage, setUrl] = useState<string>("");

  useEffect(() => {
    const findConceptsAndUser = firebaseService.auth.onAuthStateChanged(
      async (user) => {
        if (user?.email && user?.uid) {
          const userData = await findUser(user.email, user.uid);
          if (!userData?.findUser) {
            console.log("MAKE USERRRRR");
            const userData = await createUser(user.email, user.email, user.uid);
            firebaseService.user = {
              id: userData.createUser.id,
              name: userData.createUser.name,
              email: userData.createUser.email,
              firebase_id: userData.createUser.firebase_id,
            };
          } else {
            console.log("SETUSER");
            firebaseService.user = {
              id: userData.findUser.id,
              name: userData.findUser.name,
              email: userData.findUser.email,
              firebase_id: userData.findUser.firebase_id,
            };
          }
          console.log("ITS SET:", firebaseService.currentUser);
        }
        getConceptsByEmail(user?.email ?? "", setConcepts);
      }
    );
    return () => findConceptsAndUser(); // unsubscribing from the listener when the component is unmounting.
  }, []);
  const listRef = ref(firebaseStorage, "qwpefjqpgui");
  listAll(listRef).then((res) => {
    res.items.forEach(async (itemRef) => {
      console.log("hi2", itemRef);
      const url = await getDownloadURL(itemRef);
      setUrl(url);
    });
  });
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
                {/* <img src="image-url" alt="Image" /> */}
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
        <button
          onClick={async () => {
            if (firebaseService.currentUser)
              await createConcept(
                firebaseService.currentUser.id,
                undefined,
                "art",
                "me",
                "urlurlurlulr"
              );
          }}
        >
          create
        </button>
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
        <input
          type="file"
          onChange={async (event) => {
            const files = event.target.files;
            if (!files || files?.length === 0) return;
            firebaseService.uploadFile("qwpefjqpgui", files[0]);
          }}
        />
        <Image src={urlImage} width={100} height={100} alt="image" />
      </div>
    </div>
  );
};
