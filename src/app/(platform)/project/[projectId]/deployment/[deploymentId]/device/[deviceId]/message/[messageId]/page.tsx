import { CodeBlock } from "@/components/atoms/code-block";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/molecules/breadcrumbs";
import {
  Header,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { MetricCard } from "@/components/molecules/metric-card";
import { MainContainer } from "@/components/templates/main-container";
import { fetchData } from "@/lib/data-fetching";
import { TMessage } from "@/lib/type";
import { formatDate } from "@/lib/utils";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/organisms/leaflet-map"), {
  ssr: false,
});

type MessageProps = {
  params: {
    projectId: string;
    deploymentId: string;
    deviceId: string;
    messageId: string;
  };
};

export default async function Message({ params }: MessageProps) {
  const { data: messageData }: { data: TMessage } = await fetchData(
    `/message/${params.messageId}`,
  );
  return (
    <>
      <Header>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/project/${params.projectId}/deployment/${params.deploymentId}/device/${params.deviceId}/overview`}
            >
              Device alias
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/project/${params.projectId}/deployment/${params.deploymentId}/device/${params.deviceId}/messages`}
            >
              Messages
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink isCurrentPage>Message details</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HeaderTitleAndSupporting>
          <HeaderTitle>
            {formatDate(messageData.createdAt, "default", true)}
          </HeaderTitle>
        </HeaderTitleAndSupporting>
      </Header>
      <MainContainer className="grid grid-cols-1 sm:grid-cols-2">
        {/* <div className="grid h-fit grid-cols-2 gap-3">
          {Object.entries(messageData).map(([key, value]) => {
            if (key === "createdAt" || key === "receivedAt") return null;
            return (
              <MetricCard
                type="simple"
                key={key}
                heading={key}
                metric={String(value)}
              />
            );
          })}
        </div> */}
        <CodeBlock
          className="rounded-lg"
          language="json"
          code={JSON.stringify(messageData, null, 2)}
        />
        <LeafletMap
          type="default"
          className="rounded-lg"
          scrollWheelZoom
          bounds={[[messageData.latitude, messageData.longitude]]}
          markers={[
            {
              id: messageData.id,
              position: [messageData.latitude, messageData.longitude],
              content: (
                <div className="flex flex-col">
                  <p className="text-base font-medium">
                    {formatDate(messageData.createdAt, "default", true)}
                  </p>
                  <p className="text-sm">latitude : {messageData.latitude}</p>
                  <p className="text-sm">longitude : {messageData.longitude}</p>
                </div>
              ),
            },
          ]}
        />
      </MainContainer>
    </>
  );
}
