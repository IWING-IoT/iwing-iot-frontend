import { CategoryForm } from "@/components/forms/category-form";
import { DeniedEmptyState } from "@/components/molecules/denied-empty-state";
import { HeaderTitle } from "@/components/molecules/header";
import Restricted from "@/components/providers/permission-provider/restricted";
import { MainContainer } from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TCategory } from "@/lib/type";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type NewCategoryProps = {
  params: { projectId: string; categoryId: string };
};

export default async function NewCategory({ params }: NewCategoryProps) {
  const { data: allCategoryData }: { data: TCategory[] } = await fetchData(
    `/project/${params.projectId}/category`,
  );
  return (
    <Restricted to="edit" fallback={<DeniedEmptyState />}>
      <div className="flex flex-1 justify-center">
        <MainContainer className="flex max-w-xl flex-1 gap-5">
          <div>
            <Button variant={"link"} className="p-0" asChild>
              <Link href={`/project/${params.projectId}/attribute-data`}>
                <ArrowLeft className="mr-1.5 h-5 w-5" />
                Back to attribute data
              </Link>
            </Button>
            <HeaderTitle>Create new category</HeaderTitle>
          </div>
          <CategoryForm
            allCategoryData={allCategoryData}
            projectId={params.projectId}
            type="create"
          />
        </MainContainer>
      </div>
    </Restricted>
  );
}
