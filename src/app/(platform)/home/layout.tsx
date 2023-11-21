import { Suspense } from "react";
import { NewProjectDialog } from "@/components/organisms/dialogs/new-project-dialog";
import Loading from "./loading";
import MainContainer from "@/components/templates/main-container";
import {
  Header,
  HeaderContent,
  HeaderDescription,
  HeaderTitle,
} from "@/components/molecules/header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitle>Welcome back, Olivia Rhye!</HeaderTitle>
          <HeaderDescription>Here's your active projects.</HeaderDescription>
        </HeaderContent>
        <NewProjectDialog />
      </Header>
      <Suspense fallback={<Loading />}>
        <MainContainer>{children}</MainContainer>
      </Suspense>
    </>
  );
}

export const dynamic = "force-dynamic";
