import { apiSettingsColumns } from "@/components/columns/api-settings-columns";
import { DataTable } from "@/components/data-table/data-table";
import { AddApiFieldForm } from "@/components/forms/add-api-field-form";
import {
  CardHeader,
  CardHeaderActions,
  CardHeaderDescription,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "@/components/molecules/card-header";
import { ApiSettingsDropdown } from "@/components/organisms/dropdowns/api-settings-dropdown";
import DialogWithContent from "@/components/organisms/dialogs/dialog-with-content";
import Restricted from "@/components/providers/permission-provider/restricted";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TDeploymentApi, TDeploymentApiExample } from "@/lib/type";
import { Plus } from "lucide-react";
import { MainContainer } from "@/components/templates/main-container";

type ApiSettingsProps = {
  params: { projectId: string; deploymentId: string };
};

export default async function ApiSettings({ params }: ApiSettingsProps) {
  const { data: deploymentApiData }: { data: TDeploymentApi[] } =
    await fetchData(`/phase/${params.deploymentId}/phaseApi`);
  const { data: apiExampleData }: { data: TDeploymentApiExample } =
    await fetchData(`/phase/${params.deploymentId}/phaseApi/example`);
  return (
    <MainContainer>
      <TableWrapper>
        <CardHeader>
          <CardHeaderTextContent>
            <CardHeaderTitle>API settings</CardHeaderTitle>
            <CardHeaderDescription>
              Configure your device's API fields here.
            </CardHeaderDescription>
          </CardHeaderTextContent>
          <CardHeaderActions>
            <Restricted to="edit">
              <DialogWithContent
                title="Create new field"
                content={<AddApiFieldForm deploymentId={params.deploymentId} />}
              >
                <Button>
                  <Plus className="mr-2 h-5 w-5" />
                  New field
                </Button>
              </DialogWithContent>
            </Restricted>
            <ApiSettingsDropdown
              deploymentId={params.deploymentId}
              apiExampleData={apiExampleData}
            />
          </CardHeaderActions>
        </CardHeader>
        <DataTable columns={apiSettingsColumns} data={deploymentApiData} />
      </TableWrapper>
    </MainContainer>
  );
}
