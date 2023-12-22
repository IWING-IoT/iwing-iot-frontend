"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "../molecules/empty-state";
import { NotFoundIllustration } from "../atoms/illustrations/not-found-illustration";
import { DataTableGeneralToolbar } from "./general-toolbar";
import { useRouter } from "next/navigation";

interface WithId {
  id: string;
}

interface DataTableProps<TData extends WithId, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enableToggleColumns?: boolean;
  clickableRows?: boolean;
  clickableRowsBaseURL?: string;
  searchByColumn?: string;
}

export function DataTable<TData extends WithId, TValue>({
  columns,
  data,
  enableToggleColumns = false,
  clickableRows = false,
  clickableRowsBaseURL,
  searchByColumn = "name",
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => row.id,
  });

  return (
    <>
      <DataTableGeneralToolbar
        table={table}
        enableToggleColumns={enableToggleColumns}
        searchByColumn={searchByColumn}
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={clickableRows ? "cursor-pointer" : ""}
                onClick={() => {
                  if (clickableRows) {
                    router.push(`${clickableRowsBaseURL}/${row.id}`);
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <EmptyState>
                  <EmptyStateImage>
                    <NotFoundIllustration />
                  </EmptyStateImage>
                  <EmptyStateTextContent>
                    <EmptyStateTitle>No results were found</EmptyStateTitle>
                    <EmptyStateDescription>
                      Try different keywords or remove search filters.
                    </EmptyStateDescription>
                  </EmptyStateTextContent>
                </EmptyState>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
