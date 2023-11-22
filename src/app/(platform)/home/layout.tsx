import { Suspense } from "react";
import { NewProjectDialog } from "@/components/organisms/dialogs/new-project-dialog";
import Loading from "./loading";
import MainContainer from "@/components/templates/main-container";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderDescription,
  HeaderTitleAndSupporting,
  HeaderTitle,
} from "@/components/molecules/header";
import Link from "next/link";
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
            <HeaderTitle>Welcome back, Olivia Rhye!</HeaderTitle>
            <HeaderDescription>Here's your active projects.</HeaderDescription>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <Link href="/project/new">
              <Button>
                <Plus className="mr-2 h-5 w-5" />
                New Project
              </Button>
            </Link>
          </HeaderActions>
        </HeaderContent>
      </Header>
      <Suspense fallback={<Loading />}>
        <MainContainer>{children}</MainContainer>
      </Suspense>
    </>
  );
}
