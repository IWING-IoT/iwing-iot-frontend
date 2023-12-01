import {
  Header,
  HeaderContent,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import MainContainer from "@/components/templates/main-container";
import { ModeToggle } from "@/components/molecules/mode-toggle";

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
