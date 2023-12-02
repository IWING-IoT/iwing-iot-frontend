import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/molecules/breadcrumbs";
import { DeploymentDropdown } from "@/components/molecules/dropdowns/deployment-dropdown";
import { ProjectMoreDropdown } from "@/components/molecules/dropdowns/project-more-dropdowm";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import MainContainer from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TProjectDetails } from "@/lib/type";

type LayoutProps = {
  params: { projectId: string };
  children: React.ReactNode;
};
export default async function Layout({ params, children }: LayoutProps) {
  const { data }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  return (
    <>
      <Header>
        {/* <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home?sortBy=ascending">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink isCurrentPage>{data.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb> */}
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>{data.name}</HeaderTitle>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <DeploymentDropdown />
            <ProjectMoreDropdown />
          </HeaderActions>
        </HeaderContent>
      </Header>
      <MainContainer>{children}</MainContainer>
    </>
  );
}
