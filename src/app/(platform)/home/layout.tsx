import { Suspense } from "react";
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
import { getServerAuthSession } from "@/lib/auth";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerAuthSession();
  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Welcome back, {session?.user.name}!</HeaderTitle>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <Link href="/project/new">
              <Button>
                <Plus className="mr-2 h-5 w-5" />
                New project
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
