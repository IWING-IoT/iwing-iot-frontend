import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderDescription,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import MainContainer from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Devices() {
  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Devices</HeaderTitle>
            <HeaderDescription>
              View and manage all devices in this platform.
            </HeaderDescription>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <Button>
              <Plus className="mr-2 h-5 w-5" />
              New device
            </Button>
          </HeaderActions>
        </HeaderContent>
      </Header>
      <MainContainer>
        <h1>Devices</h1>
      </MainContainer>
    </>
  );
}
