"use client";
import { Button } from "@/components/ui/button";
import DialogWithContent from "./dialog-with-content";
import { SlidersHorizontal } from "lucide-react";
import { useAtom } from "jotai";
import { deviceVisibilityAtom } from "@/store/atoms";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { customizeDeviceVisibilityColumns } from "@/components/columns/customize-device-visibility-columns";
import { TDevicePath, TDevicePosition } from "@/lib/type";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { DialogFooter } from "@/components/ui/dialog";
import { generateEscEvent } from "@/lib/utils";

type CustomizeDeviceVisibilityDialogProps = {
  data: TDevicePosition[] | TDevicePath[] | undefined;
};

export function CustomizeDeviceVisibilityDialog({
  data,
}: CustomizeDeviceVisibilityDialogProps) {
  const [deviceVisibility, setDeviceVisibility] = useAtom(deviceVisibilityAtom);
  const initialRowSelection = deviceVisibility.reduce(
    (acc, curr) => ({ ...acc, [curr]: true }),
    {},
  );
  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>(
    initialRowSelection,
  );
  //   useEffect(() => {
  //     console.log(rowSelection);
  //     if (Object.keys(rowSelection).length > 0) {
  //       const selectedDevices = Object.keys(rowSelection).filter(
  //         (key) => rowSelection[key],
  //       );
  //       setDeviceVisibility(selectedDevices);
  //     }
  //   }, [rowSelection]);
  function onClickSubmit() {
    const selectedDevices = Object.keys(rowSelection).filter(
      (key) => rowSelection[key],
    );
    setDeviceVisibility(selectedDevices);
    generateEscEvent();
  }
  return (
    <DialogWithContent
      title="Choose device to show on map"
      content={
        <div className="flex flex-1 flex-col space-y-6">
          <TableWrapper>
            <DataTable
              columns={customizeDeviceVisibilityColumns}
              data={data ?? []}
              searchByColumn="alias"
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
            />
          </TableWrapper>
          <DialogFooter>
            <Button
              onClick={onClickSubmit}
              disabled={Object.keys(rowSelection).length === 0}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </div>
      }
    >
      <Button variant={"outline"}>
        <SlidersHorizontal className="mr-2 h-5 w-5" />
        Customize
      </Button>
    </DialogWithContent>
  );
}
