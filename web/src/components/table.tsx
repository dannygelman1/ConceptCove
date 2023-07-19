import { ReactElement } from "react";
import { createConcept, getConcept } from "@/lib/ConceptService";

interface TableProps {}

export const Table = ({}: TableProps): ReactElement => {
  return (
    <div className="bg-green-200 absolute">
      <h1 className="font-bold text-2xl">Concept Cove</h1>
      <table className="border-separate border-spacing-4">
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
          <tr>
            <td className="p-4">{/* <img src="image-url" alt="Image" /> */}</td>
            <td className="p-4">Artwork Name</td>
            <td className="p-4">Artist Name</td>
            <td className="p-4">
              <a href="link-url">Link</a>
            </td>
            <td className="p-4">Tag 1, Tag 2, Tag 3</td>
          </tr>
        </tbody>
      </table>
      <div className="flex space-x-5">
        <button
          onClick={async () => {
            await createConcept(
              "5788cea0-66c9-4292-9cab-db9d57ba0cfc",
              "art",
              "me",
              "undefined"
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
      </div>
    </div>
  );
};
