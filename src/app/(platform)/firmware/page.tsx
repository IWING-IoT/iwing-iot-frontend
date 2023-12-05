import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderDescription,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { MainContainer } from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Firmware() {
  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Firmware</HeaderTitle>
            <HeaderDescription>
              View and manage all firmware in this platform.
            </HeaderDescription>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <Button>
              <Plus className="mr-2 h-5 w-5" />
              New firmware
            </Button>
          </HeaderActions>
        </HeaderContent>
      </Header>
      <MainContainer>
        <h1>Firmware</h1>
      </MainContainer>
    </>
  );
}
