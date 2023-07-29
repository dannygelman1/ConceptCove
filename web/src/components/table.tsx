import { ReactElement, useEffect, useState } from "react";
import {
  createConcept,
  getConcept,
  getConceptsByEmail,
} from "@/lib/AppService";
import { Concept, getConceptData } from "@/lib/gqlClient";
import firebaseService from "@/lib/firebaseService";

interface TableProps {}

export const Table = ({}: TableProps): ReactElement => {
  const [concepts, setConcepts] = useState<Concept[]>([]);

  useEffect(() => {
    const unsubscribe = firebaseService.auth.onAuthStateChanged((user) => {
      console.log("FIRST USE EFFECT: ", user);
      getConceptsByEmail(user?.email ?? "", setConcepts);
    });
    return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting.
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
            await createConcept(
              "5788cea0-66c9-4292-9cab-db9d57ba0cfc",
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
          login
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
