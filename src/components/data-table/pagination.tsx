"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

import { Table } from "@tanstack/react-table";

import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type DataTablePaginationProps<TData> =
  | {
      table: Table<TData>;
      manualPagination?: never;
      currentPage?: never;
      pageCount?: never;
      pageSize?: never;
    }
  | {
      table?: never;
      manualPagination: boolean;
      currentPage: number;
      pageCount: number;
      pageSize: number;
    };

export function DataTablePagination<TData>({
  table,
  manualPagination = false,
  currentPage = 1,
  pageCount = 1,
  pageSize = 10,
}: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  if (manualPagination) {
    return (
      <div className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) =>
              router.push(pathname + "?" + createQueryString("pageSize", value))
            }
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage} of {pageCount}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              size={"icon"}
              className="hidden lg:flex"
              onClick={() =>
                router.push(
                  pathname + "?" + createQueryString("currentPage", "1"),
                )
              }
              disabled={currentPage <= 1}
            >
              <ChevronsLeftIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size={"icon"}
              onClick={() =>
                router.push(
                  pathname +
                    "?" +
                    createQueryString("currentPage", String(currentPage - 1)),
                )
              }
              disabled={currentPage <= 1}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size={"icon"}
              onClick={() =>
                router.push(
                  pathname +
                    "?" +
                    createQueryString("currentPage", String(currentPage + 1)),
                )
              }
              disabled={currentPage >= pageCount}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size={"icon"}
              className="hidden lg:flex"
              onClick={() =>
                router.push(
                  pathname +
                    "?" +
                    createQueryString("currentPage", String(pageCount)),
                )
              }
              disabled={currentPage >= pageCount}
            >
              <ChevronsRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  if (!table) {
    return null;
  }
  return (
    <div className="flex items-center justify-between border-t p-4">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="w-20">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            size={"icon"}
            className="hidden lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeftIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size={"icon"}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size={"icon"}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size={"icon"}
            className="hidden lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRightIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
