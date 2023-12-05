import {
  Header,
  HeaderContent,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { MainContainer } from "@/components/templates/main-container";

export default function ArchivedProjects() {
  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Archived projects</HeaderTitle>
          </HeaderTitleAndSupporting>
        </HeaderContent>
      </Header>
      <MainContainer>
        <h1>Archived projects</h1>
      </MainContainer>
    </>
  );
}
