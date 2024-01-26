"use client";

import {
  ColumnDef,
  OnChangeFn,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
import { EmptyIllustration } from "../atoms/illustrations/empty-illustration";
import { ScrollArea } from "../ui/scroll-area";
import { DataTablePagination } from "./pagination";

interface WithId {
  id: string;
}

interface DataTableProps<TData extends WithId, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enableToggleColumns?: boolean;
  clickableRows?: boolean;
  clickableRowsBaseURL?: string;
  clickableRowsTrailURL?: string;
  searchByColumn?: string;
  showToolbar?: boolean;
  rowSelection?: RowSelectionState;
  setRowSelection?: OnChangeFn<RowSelectionState>;
  onRowClick?: (row: TData) => void;
  highlightOnSelected?: boolean;
  usePagination?: boolean;
}

export function DataTable<TData extends WithId, TValue>({
  columns,
  data,
  enableToggleColumns = false,
  clickableRows = false,
  clickableRowsBaseURL,
  clickableRowsTrailURL,
  searchByColumn = "name",
  showToolbar = true,
  rowSelection,
  setRowSelection,
  onRowClick,
  highlightOnSelected = true,
  usePagination = true,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: usePagination ? getPaginationRowModel() : undefined,
    getRowId: (row) => row.id,
    onRowSelectionChange: setRowSelection || (() => {}),
    state: {
      rowSelection: rowSelection || {},
    },
  });

  return (
    <>
      {showToolbar && (
        <DataTableGeneralToolbar
          table={table}
          enableToggleColumns={enableToggleColumns}
          searchByColumn={searchByColumn}
        />
      )}
      <ScrollArea>
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
                  data-state={
                    row.getIsSelected() && highlightOnSelected && "selected"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        clickableRows &&
                        cell.column.columnDef.meta?.clickable !== false
                          ? "cursor-pointer"
                          : ""
                      }
                      onClick={() => {
                        if (
                          clickableRows &&
                          cell.column.columnDef.meta?.clickable !== false &&
                          onRowClick
                        ) {
                          onRowClick(row.original);
                        } else if (
                          clickableRows &&
                          cell.column.columnDef.meta?.clickable !== false &&
                          clickableRowsBaseURL
                        ) {
                          router.push(
                            `${clickableRowsBaseURL}/${row.id}${
                              clickableRowsTrailURL ? clickableRowsTrailURL : ""
                            }`,
                          );
                        }
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <EmptyState>
                    <EmptyStateImage>
                      {data.length > 0 ? (
                        <NotFoundIllustration />
                      ) : (
                        <EmptyIllustration />
                      )}
                    </EmptyStateImage>
                    <EmptyStateTextContent>
                      <EmptyStateTitle>
                        {data.length > 0
                          ? "No results were found"
                          : "This table is empty"}
                      </EmptyStateTitle>
                      <EmptyStateDescription>
                        {data.length > 0
                          ? "Try different keywords or remove search filters."
                          : "Try adding a new item and it will appear here."}
                      </EmptyStateDescription>
                    </EmptyStateTextContent>
                  </EmptyState>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      {data.length > 0 && usePagination && (
        <DataTablePagination table={table} />
      )}
    </>
  );
}
