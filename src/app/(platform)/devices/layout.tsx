import { AddDeviceForm } from "@/components/forms/add-device-form";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderDescription,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { NavTabs } from "@/components/molecules/nav-tabs";
import { DialogWithContent } from "@/components/organisms/dialogs/dialog-with-content";
import { MainContainer } from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const tabs = [
    { label: "Standalone", href: "standalone" },
    { label: "Gateway", href: "gateway" },
    { label: "Node", href: "node" },
  ];
  return (
    <>
      <Header className="pb-0 sm:pb-0">
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Devices</HeaderTitle>
            <HeaderDescription>
              View and manage all devices in this platform.
            </HeaderDescription>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <DialogWithContent title="New device" content={<AddDeviceForm />}>
              <Button>
                <Plus className="mr-2 h-5 w-5" />
                New device
              </Button>
            </DialogWithContent>
          </HeaderActions>
        </HeaderContent>
        <NavTabs tabs={tabs} layoutId="devices" />
      </Header>
      <MainContainer>{children}</MainContainer>
    </>
  );
}
