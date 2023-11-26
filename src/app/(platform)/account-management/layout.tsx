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
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Account management</HeaderTitle>
            <HeaderDescription>
              Manage user accounts and their role here.
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
      <MainContainer>{children}</MainContainer>
    </>
  );
}
