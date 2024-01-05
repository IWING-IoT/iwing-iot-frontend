import { categoriesColumns } from "@/components/columns/categories-columns";
import { DataTable } from "@/components/data-table/data-table";
import {
  CardHeader,
  CardHeaderActions,
  CardHeaderDescription,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "@/components/molecules/card-header";
import Restricted from "@/components/providers/permission-provider/restricted";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TCategory } from "@/lib/type";
import { Plus } from "lucide-react";
import Link from "next/link";

type AttributeDataProps = {
  params: {
    projectId: string;
  };
};

export default async function AttributeData({ params }: AttributeDataProps) {
  const { data }: { data: TCategory[] } = await fetchData(
    `/project/${params.projectId}/category`,
  );
  return (
    <TableWrapper>
      <CardHeader>
        <CardHeaderTextContent>
          <CardHeaderTitle>Attribute data</CardHeaderTitle>
          <CardHeaderDescription>
            View and manage all attribute data in this project.
          </CardHeaderDescription>
        </CardHeaderTextContent>
        <Restricted to="edit">
          <CardHeaderActions>
            <Button asChild>
              <Link href={"category/new"}>
                <Plus className="mr-1.5 h-5 w-5" />
                New category
              </Link>
            </Button>
          </CardHeaderActions>
        </Restricted>
      </CardHeader>
      <DataTable
        columns={categoriesColumns}
        data={data}
        enableToggleColumns={false}
        clickableRows={true}
        clickableRowsBaseURL="category"
      />
    </TableWrapper>
  );
}
