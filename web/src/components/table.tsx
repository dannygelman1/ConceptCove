import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import { Concept, SortOrderType } from "@/lib/types";
import { LoadingRow, Row } from "./row";
import { User } from "@/models/user";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { InputForm } from "./inputForm";
import { EscapeIcon } from "./escapeIcon";
import { SelectNumber } from "./selectNumber";
import { UpDownIcon } from "./upDownIcon";

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
  const [sort, setSort] = useState<SortOrderType>(SortOrderType.Created);

  const filteredConcepts = useMemo(() => {
    let conceptsCopy = concepts;
    switch (sort) {
      case SortOrderType.Created: {
        conceptsCopy = conceptsCopy.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      }
      case SortOrderType.CreatedReverse: {
        conceptsCopy = conceptsCopy.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      }
      case SortOrderType.Artist: {
        conceptsCopy = conceptsCopy.sort((a, b) => {
          const artistA = a.artist || "N/A";
          const artistB = b.artist || "N/A";
          return artistA.localeCompare(artistB);
        });
        break;
      }
      case SortOrderType.ArtistReverse: {
        conceptsCopy = conceptsCopy.sort((a, b) => {
          const artistA = a.artist || "N/A";
          const artistB = b.artist || "N/A";
          return artistB.localeCompare(artistA);
        });
        break;
      }
      case SortOrderType.Name: {
        conceptsCopy = conceptsCopy.sort((a, b) => {
          const nameA = a.title || "N/A";
          const nameB = b.title || "N/A";
          return nameA.localeCompare(nameB);
        });
        break;
      }
      case SortOrderType.NameReverse: {
        conceptsCopy = conceptsCopy.sort((a, b) => {
          const nameA = a.title || "N/A";
          const nameB = b.title || "N/A";
          return nameB.localeCompare(nameA);
        });
        break;
      }
      case SortOrderType.Link: {
        conceptsCopy = conceptsCopy.sort((a, b) => {
          const linkA = a.url || "N/A";
          const linkB = b.url || "N/A";
          return linkA.localeCompare(linkB);
        });
        break;
      }
      case SortOrderType.LinkReverse: {
        conceptsCopy = conceptsCopy.sort((a, b) => {
          const linkA = a.url || "N/A";
          const linkB = b.url || "N/A";
          return linkB.localeCompare(linkA);
        });
        break;
      }
    }

    if (!searchTerm) {
      return conceptsCopy;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return conceptsCopy.filter(
      (concept) =>
        concept.title &&
        concept.title.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, concepts, sort]);

  const router = useRouter();
  return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <div className="flex flex-row space-x-2 items-center">
        <Image
          className="w-[75px] h-[75px]"
          src={"/logo.png"}
          alt="Image"
          width={75}
          height={75}
        />
        <div className="font-thin text-4xl items-center justify-center text-center">
          CONCEPT COVE
        </div>
      </div>
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
      <Table sort={sort} setSort={setSort}>
        {conceptsLoading
          ? Array.from(new Set([0, 1, 2, 3])).map((i) => (
              <LoadingRow rowNum={i} key={i} />
            ))
          : filteredConcepts?.map((concept, i) => {
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
  sort: SortOrderType;
  setSort: Dispatch<SetStateAction<SortOrderType>>;
}

export const Table = ({
  children,
  sort,
  setSort,
}: TableProps): ReactElement => {
  return (
    <div className="w-full flex flex-col rounded-md min-h-[416px]">
      <div className="flex flex-row space-x-10 bg-slate-300 mx-24 px-14 rounded-t-md">
        <div className="font-thin text-2xl w-1/5 truncate">IMAGE</div>
        <div
          className="font-thin text-2xl w-1/5 truncate cursor-pointer select-none"
          onClick={() => {
            sort === SortOrderType.Name
              ? setSort(SortOrderType.NameReverse)
              : setSort(SortOrderType.Name);
          }}
        >
          <div className="flex flex-row space-x-4 items-center">
            <span>NAME</span>
            <UpDownIcon
              className="ml-4"
              sortedBy={
                sort === SortOrderType.Name ||
                sort === SortOrderType.NameReverse
              }
              reversed={sort === SortOrderType.NameReverse}
            />
          </div>
        </div>
        <div
          className="font-thin text-2xl w-1/5 truncate cursor-pointer select-none"
          onClick={() => {
            sort === SortOrderType.Artist
              ? setSort(SortOrderType.ArtistReverse)
              : setSort(SortOrderType.Artist);
          }}
        >
          <div className="flex flex-row space-x-4 items-center">
            <span>ARTIST</span>
            <UpDownIcon
              className="ml-4"
              sortedBy={
                sort === SortOrderType.Artist ||
                sort === SortOrderType.ArtistReverse
              }
              reversed={sort === SortOrderType.ArtistReverse}
            />
          </div>
        </div>
        <div
          className="font-thin text-2xl w-1/5 truncate cursor-pointer select-none"
          onClick={() => {
            sort === SortOrderType.Link
              ? setSort(SortOrderType.LinkReverse)
              : setSort(SortOrderType.Link);
          }}
        >
          <div className="flex flex-row space-x-4 items-center">
            <span>LINK</span>
            <UpDownIcon
              className="ml-4"
              sortedBy={
                sort === SortOrderType.Link ||
                sort === SortOrderType.LinkReverse
              }
              reversed={sort === SortOrderType.LinkReverse}
            />
          </div>
        </div>
        <div
          className="font-thin text-2xl w-1/5 truncate cursor-pointer select-none"
          onClick={() => {
            sort === SortOrderType.Created
              ? setSort(SortOrderType.CreatedReverse)
              : setSort(SortOrderType.Created);
          }}
        >
          <div className="flex flex-row space-x-4 items-center">
            <span>CREATED</span>
            <UpDownIcon
              className="ml-4"
              sortedBy={
                sort === SortOrderType.Created ||
                sort === SortOrderType.CreatedReverse
              }
              reversed={sort === SortOrderType.CreatedReverse}
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
