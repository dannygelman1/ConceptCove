import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Concept } from "@/lib/types";
import { Row } from "./row";

interface FullTableProps {
  concepts: Concept[];
  setConcepts: Dispatch<SetStateAction<Concept[]>>;
}

export const FullTable = ({ concepts, setConcepts }: FullTableProps) => {
  const [editRowId, setEditRowId] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);

  return (
    <div className="flex flex-col space-y-4 items-center">
      <h1 className="font-thin text-4xl text-center p-5">CONCEPT COVE</h1>
      <Table>
        {concepts
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((concept, i) => {
            return (
              i >= (pageNumber - 1) * 4 &&
              i < (pageNumber - 1) * 4 + 4 && (
                <Row
                  key={concept.id}
                  concepts={concepts}
                  concept={concept}
                  i={i}
                  setConcepts={setConcepts}
                  editRowId={editRowId}
                  setEditRowId={setEditRowId}
                />
              )
            );
          })}
      </Table>
      <div className="flex flex-row space-x-2 items-center">
        <button
          className="bg-slate-500/80 hover:bg-slate-500/90 text-slate-100 hover:text-white rounded-md p-2 disabled:bg-slate-200 disabled:text-slate-400"
          onClick={() => {
            setPageNumber((prev) => prev - 1);
          }}
          disabled={pageNumber <= 1}
        >
          PREVIOUS
        </button>
        <span>{pageNumber}</span>
        <button
          className="bg-slate-500/80 hover:bg-slate-500/90 text-slate-100 hover:text-white rounded-md p-2  disabled:bg-slate-200 disabled:text-slate-400"
          onClick={() => {
            setPageNumber((prev) => prev + 1);
          }}
          disabled={pageNumber >= Math.ceil(concepts.length / 4)}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

interface TableProps {
  children?: ReactNode;
}

export const Table = ({ children }: TableProps): ReactElement => {
  return (
    <div className="w-full flex flex-col rounded-md">
      <div className="flex flex-row space-x-10 bg-slate-300 mx-24 px-14 rounded-t-md">
        <div className="font-thin text-2xl w-1/4 truncate">IMAGE</div>
        <div className="font-thin text-2xl w-1/4 truncate">
          <span className="font-thin text-2xl">NAME</span>
        </div>
        <div className="font-thin text-2xl w-1/4 truncate">ARTIST</div>
        <div className="font-thin text-2xl w-1/4 truncate">LINK</div>
      </div>
      {children}
    </div>
  );
};
