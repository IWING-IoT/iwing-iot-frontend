import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./column-toggle";
import { SearchInput } from "../ui/input";

interface DataTableGeneralToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableGeneralToolbar<TData>({
  table,
}: DataTableGeneralToolbarProps<TData>) {
  return (
    <div className="flex justify-between border-b px-4 py-3">
      <SearchInput
        className="max-w-[400px]"
        placeholder="Search by name"
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
      />
      <DataTableViewOptions table={table} />
    </div>
  );
}
