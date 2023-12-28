import { DataTable } from "@/components/data-table/data-table";
import { userAccountColumns } from "@/components/columns/user-account-columns";
import { fetchData } from "@/lib/data-fetching";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { TUserAccountDetails } from "@/lib/type";

export default async function AccountManagement() {
  const { data }: { data: TUserAccountDetails[] } =
    await fetchData("/admin/account");
  return (
    <TableWrapper>
      <DataTable columns={userAccountColumns} data={data} />
    </TableWrapper>
  );
}
