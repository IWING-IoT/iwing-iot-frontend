import { CategoryItemsDataTable } from "@/components/data-table/category-items-data-table";
import { ItemForm } from "@/components/forms/item-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/molecules/breadcrumbs";
import { CategoryDropdown } from "@/components/organisms/dropdowns/category-dropdown";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderDescription,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { DialogWithContent } from "@/components/organisms/dialogs/dialog-with-content";
import Restricted from "@/components/providers/permission-provider/restricted";
import { MainContainer } from "@/components/templates/main-container";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import {
  TAllEntries,
  TCategoryDetails,
  TEntry,
  TProjectDetails,
} from "@/lib/type";
import { Plus } from "lucide-react";

type CategoryProps = {
  params: { projectId: string; categoryId: string };
};

export default async function Category({ params }: CategoryProps) {
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  const { data: categoryData }: { data: TCategoryDetails } = await fetchData(
    `/category/${params.categoryId}`,
  );
  const categoryReferenceArray = categoryData.entryDefinitions.filter(
    (entry) => entry.type === "category_reference",
  );
  let allCategoriesEntries: TAllEntries = {};
  for (const categoryReference of categoryReferenceArray) {
    const { data }: { data: TEntry[] } = await fetchData(
      `/category/${categoryReference.category?.id}/entry`,
    );
    if (categoryReference.category?.id) {
      allCategoriesEntries[categoryReference.category?.name] = data;
    }
  }
  // console.log(categoryReferenceData);

  return (
    <>
      <Header>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/project/${params.projectId}/deployments`}>
              {projectData.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/project/${params.projectId}/attribute-data`}
            >
              Attribute Data
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink isCurrentPage>{categoryData.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>{categoryData.name}</HeaderTitle>
            {categoryData.description && (
              <HeaderDescription>{categoryData.description}</HeaderDescription>
            )}
          </HeaderTitleAndSupporting>
          <Restricted to="edit">
            <HeaderActions>
              <DialogWithContent
                title="Add new item"
                content={
                  <ItemForm
                    categoryData={categoryData}
                    categoryId={params.categoryId}
                    type="add"
                    allEntries={allCategoriesEntries}
                  />
                }
              >
                <Button type="button">
                  <Plus className="mr-2 h-5 w-5" />
                  New item
                </Button>
              </DialogWithContent>
              <CategoryDropdown
                projectId={params.projectId}
                categoryId={params.categoryId}
                categoryData={categoryData}
              />
            </HeaderActions>
          </Restricted>
        </HeaderContent>
      </Header>
      <MainContainer>
        <TableWrapper>
          <CategoryItemsDataTable
            categoryData={categoryData}
            categoryId={params.categoryId}
            allEntries={allCategoriesEntries}
          />
        </TableWrapper>
      </MainContainer>
    </>
  );
}
