import { RouterBackButton } from "@/components/atoms/router-back-button";
import { AddDeploymentDevicesForm } from "@/components/forms/add-deployment-devices-form";
import { HeaderTitle } from "@/components/molecules/header";
import { MainContainer } from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TDevices } from "@/lib/type";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type AddDeviceProps = {
  params: {
    projectId: string;
    deploymentId: string;
  };
};

export default async function AddDevice({ params }: AddDeviceProps) {
  const { data: standaloneData }: { data: TDevices[] } = await fetchData(
    "/device",
    [
      { key: "type", value: "standalone" },
      { key: "status", value: "available" },
    ],
  );
  const { data: gatewayData }: { data: TDevices[] } = await fetchData(
    "/device",
    [
      { key: "type", value: "gateway" },
      { key: "status", value: "available" },
    ],
  );
  const { data: nodeData }: { data: TDevices[] } = await fetchData("/device", [
    { key: "type", value: "node" },
    { key: "status", value: "available" },
  ]);
  const devicesData = standaloneData.concat(gatewayData, nodeData);
  return (
    <div className="flex flex-1 justify-center">
      <MainContainer className="flex max-w-xl flex-1 gap-5">
        <div>
          <Button variant={"link"} className="p-0" asChild>
            <Link
              href={`/project/${params.projectId}/deployment/${params.deploymentId}/devices`}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to deployment
            </Link>
          </Button>
          <HeaderTitle>Add new firmware</HeaderTitle>
        </div>
        <AddDeploymentDevicesForm devicesData={devicesData} />
      </MainContainer>
    </div>
  );
}
