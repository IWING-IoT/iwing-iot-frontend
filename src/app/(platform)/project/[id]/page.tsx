import {
  Header,
  HeaderContent,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import MainContainer from "@/components/templates/main-container";
import { fetchData } from "@/lib/data-fetching";
import { TProjectDetails } from "@/lib/type";

type ProjectProps = {
  params: { id: string };
};
export default async function Project({ params }: ProjectProps) {
  const { data }: { data: TProjectDetails } = await fetchData(
    `/project/${params.id}`,
  );
  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>{data.name}</HeaderTitle>
          </HeaderTitleAndSupporting>
        </HeaderContent>
      </Header>
      <MainContainer>
        <h1>Project</h1>
      </MainContainer>
    </>
  );
}
