import {
  Header,
  HeaderContent,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { ModeToggle } from "@/components/molecules/mode-toggle";
import { MainContainer } from "@/components/templates/main-container";

export default function Settings() {
  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Settings</HeaderTitle>
          </HeaderTitleAndSupporting>
        </HeaderContent>
      </Header>
      <MainContainer>
        <ModeToggle />
      </MainContainer>
    </>
  );
}
