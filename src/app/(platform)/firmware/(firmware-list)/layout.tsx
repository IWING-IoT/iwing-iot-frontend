import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderDescription,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { NavTabs } from "@/components/molecules/nav-tabs";
import { MainContainer } from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const tabs = [
    { label: "Source code", href: "source" },
    { label: "Config file", href: "config" },
    { label: "Binary file", href: "binary" },
  ];
  return (
    <>
      <Header className="pb-0 sm:pb-0">
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Firmware</HeaderTitle>
            <HeaderDescription>
              View and manage all firmware in this platform.
            </HeaderDescription>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <Button asChild>
              <Link href={"/firmware/new"}>
                <Plus className="mr-2 h-5 w-5" />
                New firmware
              </Link>
            </Button>
          </HeaderActions>
        </HeaderContent>
        <NavTabs tabs={tabs} layoutId="firmware" />
      </Header>
      <MainContainer>{children}</MainContainer>
    </>
  );
}
