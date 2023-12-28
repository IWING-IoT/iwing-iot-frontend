import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./column-toggle";
import { SearchInput } from "../ui/input";

interface DataTableGeneralToolbarProps<TData> {
  table: Table<TData>;
  enableToggleColumns: boolean;
  searchByColumn: string;
}

export function DataTableGeneralToolbar<TData>({
  table,
  enableToggleColumns,
  searchByColumn,
}: DataTableGeneralToolbarProps<TData>) {
  return (
    <div className="flex justify-between border-b px-4 py-3">
      <SearchInput
        id="search"
        className="max-w-[400px]"
        placeholder={`Search by ${searchByColumn}`}
        value={
          (table.getColumn(searchByColumn)?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn(searchByColumn)?.setFilterValue(event.target.value)
        }
      />
      {enableToggleColumns && <DataTableViewOptions table={table} />}
    </div>
  );
}
