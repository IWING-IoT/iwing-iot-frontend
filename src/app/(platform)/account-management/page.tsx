import { DataTable } from "@/components/data-table/data-table";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderDescription,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  TUserAccount,
  userAccountColumns,
} from "@/components/columns/user-account-columns";
import { fetchData } from "@/lib/data-fetching";
import { UserAccountForm } from "@/components/forms/user-account-form";
import { FormDialog } from "@/components/organisms/dialogs/form-dialog";
import { MainContainer } from "@/components/templates/main-container";

export default async function AccountManagement() {
  const { data }: { data: TUserAccount[] } = await fetchData("/admin/account");
  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Account Management</HeaderTitle>
            <HeaderDescription>
              View and manage all account in this platform.
            </HeaderDescription>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <FormDialog
              form={<UserAccountForm submitLabel="Create" />}
              title="Create new account"
            >
              <Button>
                <Plus className="mr-2 h-5 w-5" />
                New account
              </Button>
            </FormDialog>
          </HeaderActions>
        </HeaderContent>
      </Header>
      <MainContainer>
        <DataTable columns={userAccountColumns} data={data} />
      </MainContainer>
    </>
  );
}
