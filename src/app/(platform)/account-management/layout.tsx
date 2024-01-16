import { NewUserAccountForm } from "@/components/forms/new-user-account-form";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderDescription,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import DialogWithContent from "@/components/organisms/dialogs/dialog-with-content";
import { MainContainer } from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
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
            <DialogWithContent
              content={<NewUserAccountForm />}
              title="Create new account"
            >
              <Button>
                <Plus className="mr-1.5 h-5 w-5" />
                New account
              </Button>
            </DialogWithContent>
          </HeaderActions>
        </HeaderContent>
      </Header>
      <MainContainer>{children}</MainContainer>
    </>
  );
}
