"use client";

import {
  TAllEntries,
  TAttributeEntry,
  TCategoryDetails,
  TEntry,
} from "@/lib/type";
import { DataTableColumnHeader } from "../data-table/column-header";
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
import { DialogWithContent } from "../organisms/dialogs/dialog-with-content";
import { Button } from "../ui/button";
import { Eye, Pen, Trash2 } from "lucide-react";
import Restricted from "../providers/permission-provider/restricted";
import { DeleteActionDialog } from "../organisms/dialogs/delete-action-dialog";
import { ItemForm } from "../forms/item-form";
import dynamic from "next/dynamic";
import { LoadingIndicator } from "../atoms/loading-indicator";
import { EmptyIllustration } from "../atoms/illustrations/empty-illustration";

const AspectRatioImage = dynamic(
  () =>
    import("../atoms/aspect-ratio-image").then((mod) => mod.AspectRatioImage),
  {
    ssr: false,
    loading: () => <LoadingIndicator className="h-80 w-full" />,
  },
);

type DataTableProps = {
  categoryId: string;
  categoryData: TCategoryDetails;
  allEntries: TAllEntries;
};

export function CategoryItemsDataTable({
  categoryId,
  categoryData,
  allEntries,
}: DataTableProps) {
  const mainAttributeColumn: ColumnDef<TAttributeEntry>[] = [
    {
      accessorKey: categoryData.mainAttribute,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={categoryData.mainAttribute}
        />
      ),
      cell: ({ row }) => {
        const data = String(row.getValue(categoryData.mainAttribute));
        return <p className="w-max text-base font-medium">{data}</p>;
      },
    },
  ];

  const otherAttributesColumns = categoryData.entryDefinitions.map((key) => {
    if (key.type === "image") {
      return {
        accessorKey: key.accessorKey,
        header: key.accessorKey,
        cell: ({ row }) => {
          const imageSrc = String(row.getValue(key.accessorKey));
          if (!imageSrc) {
            return <p className="text-muted-foreground">-</p>;
          }
          return (
            <DialogWithContent
              title={row.getValue(categoryData.mainAttribute)}
              className="h-fit"
              content={
                <AspectRatioImage
                  imageSrc={imageSrc}
                  alt={row.getValue(categoryData.mainAttribute)}
                />
              }
            >
              <Button variant={"outline"}>
                <Eye className="mr-2 h-5 w-5" />
                Show
              </Button>
            </DialogWithContent>
          );
        },
      } as ColumnDef<TAttributeEntry>;
    } else if (key.type === "category_reference") {
      return {
        accessorKey: key.accessorKey,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={key.accessorKey} />
        ),
        cell: ({ row }) => {
          let data = "";
          const cellValue = row.original[key.accessorKey];
          if (
            typeof cellValue === "object" &&
            cellValue !== null &&
            "name" in cellValue
          ) {
            data = cellValue.name;
          }
          return <p className="w-max text-muted-foreground">{data}</p>;
        },
      } as ColumnDef<TAttributeEntry>;
    } else {
      return {
        accessorKey: key.accessorKey,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={key.accessorKey} />
        ),
        cell: ({ row }) => {
          const data = row.getValue(key.accessorKey)
            ? String(row.getValue(key.accessorKey))
            : "-";
          return <p className="w-max text-muted-foreground">{data}</p>;
        },
      } as ColumnDef<TAttributeEntry>;
    }
  });

  const actionsColumn: ColumnDef<TAttributeEntry>[] = [
    {
      id: "actions",
      cell: ({ row }) => {
        const mainAttribute = String(row.getValue(categoryData.mainAttribute));
        const data = row.original;
        return (
          <Restricted to="edit">
            <div className="flex justify-end gap-1">
              <DialogWithContent
                title={`Edit item`}
                content={
                  <ItemForm
                    categoryId={categoryId}
                    categoryData={categoryData}
                    entryData={data}
                    type="edit"
                    allEntries={allEntries}
                  />
                }
              >
                <Button type="button" variant={"ghost"} size={"icon"}>
                  <Pen className="h-5 w-5 text-muted-foreground" />
                </Button>
              </DialogWithContent>
              <DeleteActionDialog
                title={`Delete ${mainAttribute}`}
                description={
                  "This action cannot be undone. You will lose all data associated with this item."
                }
                action="deleteEntry"
                id={data.id}
              >
                <Button type="button" variant={"ghost"} size={"icon"}>
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              </DeleteActionDialog>
            </div>
          </Restricted>
        );
      },
    },
  ];

  const categoriesColumns = mainAttributeColumn.concat(
    otherAttributesColumns,
    actionsColumn,
  );

  const table = useReactTable({
    data: categoryData.attributeEntries,
    columns: categoriesColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => row.id,
  });

  return (
    <>
      <DataTableGeneralToolbar
        table={table}
        enableToggleColumns={true}
        searchByColumn={categoryData.mainAttribute}
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
              <TableCell colSpan={categoriesColumns.length}>
                <EmptyState>
                  <EmptyStateImage>
                    {categoryData.attributeEntries.length > 0 ? (
                      <NotFoundIllustration />
                    ) : (
                      <EmptyIllustration />
                    )}
                  </EmptyStateImage>
                  <EmptyStateTextContent>
                    <EmptyStateTitle>
                      {categoryData.attributeEntries.length > 0
                        ? "No results were found"
                        : "This table is empty"}
                    </EmptyStateTitle>
                    <EmptyStateDescription>
                      {categoryData.attributeEntries.length > 0
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
    </>
  );
}
