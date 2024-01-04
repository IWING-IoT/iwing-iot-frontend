import { ProjectIllustration } from "@/components/atoms/illustrations/project-illustration";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "@/components/molecules/empty-state";
import { ProjectAndDeploymentCard } from "@/components/molecules/project-and-deployment-card";
import {
  SectionHeader,
  SectionHeaderAction,
  SectionHeaderTextContent,
  SectionHeaderTitle,
} from "@/components/molecules/section-header";
import Restricted from "@/components/providers/permission-provider/restricted";
import { CardGrid } from "@/components/templates/card-grid";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TDeployment } from "@/lib/type";
import { Plus } from "lucide-react";
import Link from "next/link";

type DeploymentProps = {
  params: { projectId: string };
};

const tabs = [
  { label: "Deployment", href: "deployment" },
  { label: "Collaborator", href: "collaborator" },
  { label: "Attribute data", href: "attribute-data" },
];

export default async function Deployment({ params }: DeploymentProps) {
  const { data: deploymentData }: { data: TDeployment[] } = await fetchData(
    `/project/${params.projectId}/phase?type=all`,
  );
  const activeDeployment = deploymentData.filter(
    (deployment) => deployment.isActive === true,
  );

  const finishedDeployment = deploymentData.filter(
    (deployment) => deployment.isActive === false,
  );

  if (deploymentData.length === 0) {
    return (
      <EmptyState>
        <EmptyStateImage>
          <ProjectIllustration />
        </EmptyStateImage>
        <Restricted
          to="edit"
          fallback={
            <EmptyStateTextContent>
              <EmptyStateTitle>No deployments yet</EmptyStateTitle>
            </EmptyStateTextContent>
          }
        >
          <EmptyStateTextContent>
            <EmptyStateTitle>No deployments yet?</EmptyStateTitle>
            <EmptyStateDescription>
              Start by creating your first one now!
            </EmptyStateDescription>
          </EmptyStateTextContent>
          <EmptyStateAction>
            <Button type="button" asChild>
              <Link href={"deployment/new"}>
                <Plus className="mr-1.5 h-5 w-5" />
                New deployment
              </Link>
            </Button>
          </EmptyStateAction>
        </Restricted>
      </EmptyState>
    );
  } else {
    return (
      <>
        {activeDeployment.length !== 0 && (
          <>
            <SectionHeader className="items-center">
              <SectionHeaderTextContent>
                <SectionHeaderTitle className="text-xl sm:text-2xl">
                  Active
                </SectionHeaderTitle>
              </SectionHeaderTextContent>
              <Restricted to="edit">
                <SectionHeaderAction>
                  <Button type="button" className="flex-1" asChild>
                    <Link href={"deployment/new"}>
                      <Plus className="mr-2 h-5 w-5" />
                      New deployment
                    </Link>
                  </Button>
                </SectionHeaderAction>
              </Restricted>
            </SectionHeader>
            <CardGrid>
              {deploymentData
                .filter((deployment) => deployment.isActive === true)
                .map((deployment) => (
                  <ProjectAndDeploymentCard
                    key={deployment.id}
                    href={`deployment/${deployment.id}/dashboard`}
                    title={deployment.name}
                    owner={deployment.owner}
                    startedAt={deployment.startedAt}
                    endedAt={deployment.endedAt}
                    isActive={deployment.isActive}
                  />
                ))}
            </CardGrid>
          </>
        )}
        {finishedDeployment.length !== 0 && (
          <>
            <SectionHeader className="items-center">
              <SectionHeaderTextContent>
                <SectionHeaderTitle className="text-xl sm:text-2xl">
                  Finished
                </SectionHeaderTitle>
              </SectionHeaderTextContent>
              <Restricted to="edit">
                {activeDeployment.length === 0 && (
                  <SectionHeaderAction>
                    <Button type="button" asChild>
                      <Link href={"deployment/new"}>
                        <Plus className="mr-2 h-5 w-5" />
                        New deployment
                      </Link>
                    </Button>
                  </SectionHeaderAction>
                )}
              </Restricted>
            </SectionHeader>
            <CardGrid>
              {deploymentData
                .filter((deployment) => deployment.isActive === false)
                .map((deployment) => (
                  <ProjectAndDeploymentCard
                    key={deployment.id}
                    href={`deployment/${deployment.id}/dashboard`}
                    title={deployment.name}
                    owner={deployment.owner}
                    startedAt={deployment.startedAt}
                    endedAt={deployment.endedAt}
                    isActive={deployment.isActive}
                  />
                ))}
            </CardGrid>
          </>
        )}
      </>
    );
  }
}
