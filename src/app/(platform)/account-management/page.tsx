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

export default function AccountManagement() {
  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Account Management</HeaderTitle>
            <HeaderDescription>
              View and manage all account in this platform.
            </HeaderDescription>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <Button>
              <Plus className="mr-2 h-5 w-5" />
              New account
            </Button>
          </HeaderActions>
        </HeaderContent>
      </Header>
      <MainContainer>
        <h1>Account Management</h1>
      </MainContainer>
    </>
  );
}
