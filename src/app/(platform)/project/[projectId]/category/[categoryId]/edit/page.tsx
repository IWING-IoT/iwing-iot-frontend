import { CategoryForm } from "@/components/forms/category-form";
import { DeniedEmptyState } from "@/components/molecules/denied-empty-state";
import { HeaderTitle } from "@/components/molecules/header";
import Restricted from "@/components/providers/permission-provider/restricted";
import { MainContainer } from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TCategory, TCategoryDetails } from "@/lib/type";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type EditCategoryProps = {
  params: { projectId: string; categoryId: string };
};

export default async function EditCategory({ params }: EditCategoryProps) {
  const { data: allCategoryData }: { data: TCategory[] } = await fetchData(
    `/project/${params.projectId}/category`,
  );
  const { data: categoryData }: { data: TCategoryDetails } = await fetchData(
    `/category/${params.categoryId}`,
  );
  return (
    <Restricted to="edit" fallback={<DeniedEmptyState />}>
      <div className="flex flex-1 justify-center">
        <MainContainer className="flex max-w-xl flex-1 gap-5">
          <div>
            <Button variant={"link"} className="p-0" asChild>
              <Link
                href={`/project/${params.projectId}/category/${params.categoryId}`}
              >
                <ArrowLeft className="mr-1.5 h-5 w-5" />
                Back to category
              </Link>
            </Button>
            <HeaderTitle>Edit {categoryData.name}</HeaderTitle>
          </div>
          <CategoryForm
            allCategoryData={allCategoryData}
            projectId={params.projectId}
            categoryData={categoryData}
            type="edit"
            categoryId={params.categoryId}
          />
        </MainContainer>
      </div>
    </Restricted>
  );
}
