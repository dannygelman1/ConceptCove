import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import { Concept } from "@/lib/types";
import { LoadingRow, Row } from "./row";
import { User } from "@/models/user";
import * as Dialog from "@radix-ui/react-dialog";
import { InputForm } from "./inputForm";
import { EscapeIcon } from "./escapeIcon";
import { SelectNumber } from "./selectNumber";

interface FullTableProps {
  user: User | undefined;
  concepts: Concept[];
  setConcepts: Dispatch<SetStateAction<Concept[]>>;
  conceptsLoading: boolean;
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
}

export const FullTable = ({
  user,
  concepts,
  setConcepts,
  conceptsLoading,
  pageNum,
  setPageNum,
}: FullTableProps) => {
  const [editRowId, setEditRowId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(4);

  const filteredConcepts = useMemo(() => {
    if (!searchTerm) {
      return concepts;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return concepts.filter(
      (concept) =>
        concept.title &&
        concept.title.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, concepts]);

  const router = useRouter();
  return (
    <div className="flex flex-col space-y-4 items-center">
      <h1 className="font-thin text-4xl text-center pt-5 pb-2">CONCEPT COVE</h1>
      <div className="flex flex-row space-x-2 w-full justify-between items-center px-24">
        {user ? (
          <div className="flex flex-row space-x-2">
            <Dialog.Root>
              <Dialog.Trigger>
                <div className="font-light text-lg p-1 flex flex-row items-center space-x-2 bg-slate-500/80 hover:bg-slate-500/90 text-slate-100 hover:text-white rounded-md">
                  <span>CREATE</span>
                  <div className="rotate-45">
                    <EscapeIcon />
                  </div>
                </div>
              </Dialog.Trigger>
              <InputForm />
            </Dialog.Root>
            <SelectNumber
              setRowsPerPage={setRowsPerPage}
              rowsPerPage={rowsPerPage}
            />
          </div>
        ) : (
          <div />
        )}
        <div>
          <span>SEARCH: </span>
          <input
            className="border-slate-600 border-2 rounded-md focus:outline-none"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const searchValue = event.target.value;
              setSearchTerm(searchValue);
            }}
          ></input>
        </div>
      </div>
      <Table>
        {conceptsLoading
          ? Array.from(new Set([0, 1, 2, 3])).map((i) => (
              <LoadingRow rowNum={i} key={i} />
            ))
          : filteredConcepts
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((concept, i) => {
                return (
                  i >= (pageNum - 1) * rowsPerPage &&
                  i < (pageNum - 1) * rowsPerPage + rowsPerPage && (
                    <Row
                      key={concept.id}
                      concepts={concepts}
                      concept={concept}
                      i={i}
                      setConcepts={setConcepts}
                      editRowId={editRowId}
                      setEditRowId={setEditRowId}
                      rowsPerPage={rowsPerPage}
                    />
                  )
                );
              })}
      </Table>
      <div className="flex flex-row space-x-2 items-center p-4">
        <button
          className="bg-slate-500/80 hover:bg-slate-500/90 text-slate-100 hover:text-white rounded-md p-2 disabled:bg-slate-200 disabled:text-slate-400"
          onClick={() => {
            setPageNum((prev) => prev - 1);
            router.push(`?pageNum=${pageNum - 1}`);
          }}
          disabled={pageNum <= 1}
        >
          PREVIOUS
        </button>
        <span>{pageNum}</span>
        <button
          className="bg-slate-500/80 hover:bg-slate-500/90 text-slate-100 hover:text-white rounded-md p-2  disabled:bg-slate-200 disabled:text-slate-400"
          onClick={() => {
            setPageNum((prev) => prev + 1);
            router.push(`?pageNum=${pageNum + 1}`);
          }}
          disabled={pageNum >= Math.ceil(concepts.length / rowsPerPage)}
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
    <div className="w-full flex flex-col rounded-md min-h-[416px]">
      <div className="flex flex-row space-x-10 bg-slate-300 mx-24 px-14 rounded-t-md">
        <div className="font-thin text-2xl w-1/5 truncate">IMAGE</div>
        <div className="font-thin text-2xl w-1/5 truncate">
          <span className="font-thin text-2xl">NAME</span>
        </div>
        <div className="font-thin text-2xl w-1/5 truncate">ARTIST</div>
        <div className="font-thin text-2xl w-1/5 truncate">LINK</div>
        <div className="font-thin text-2xl w-1/5 truncate">CREATED</div>
      </div>
      {children}
    </div>
  );
};
