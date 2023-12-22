import { devicesColumns } from "@/components/columns/devices-colmns";
import { DataTable } from "@/components/data-table/data-table";
import { AddDeviceForm } from "@/components/forms/add-device-form";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderDescription,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { DialogWithContent } from "@/components/organisms/dialogs/dialog-with-content";
import { MainContainer } from "@/components/templates/main-container";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Button } from "@/components/ui/button";
import { allDevices } from "@/lib/mock";
import { Plus } from "lucide-react";

export default function Devices() {
  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Devices</HeaderTitle>
            <HeaderDescription>
              View and manage all devices in this platform.
            </HeaderDescription>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <DialogWithContent title="New device" content={<AddDeviceForm />}>
              <Button>
                <Plus className="mr-2 h-5 w-5" />
                New device
              </Button>
            </DialogWithContent>
          </HeaderActions>
        </HeaderContent>
      </Header>
      <MainContainer>
        <TableWrapper>
          <DataTable columns={devicesColumns} data={allDevices} />
        </TableWrapper>
      </MainContainer>
    </>
  );
}
