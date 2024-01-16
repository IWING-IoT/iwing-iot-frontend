import { ProjectIllustration } from "@/components/atoms/illustrations/project-illustration";
import { DeploymentForm } from "@/components/forms/deployment-form";
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
import DialogWithContent from "@/components/organisms/dialogs/dialog-with-content";
import Restricted from "@/components/providers/permission-provider/restricted";
import { CardGrid } from "@/components/templates/card-grid";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TDeployment } from "@/lib/type";
import { Plus } from "lucide-react";

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
    `/project/${params.projectId}/phase`,
    [{ key: "type", value: "all" }],
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
            <DialogWithContent
              title="Create new deployment"
              content={
                <DeploymentForm type="create" projectId={params.projectId} />
              }
            >
              <Button type="button">
                <Plus className="mr-1.5 h-5 w-5" />
                New deployment
              </Button>
            </DialogWithContent>
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
                  <DialogWithContent
                    title="Create new deployment"
                    content={
                      <DeploymentForm
                        type="create"
                        projectId={params.projectId}
                      />
                    }
                  >
                    <Button type="button" className="flex-1">
                      <Plus className="mr-2 h-5 w-5" />
                      New deployment
                    </Button>
                  </DialogWithContent>
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
                    <DialogWithContent
                      title="Create new deployment"
                      content={
                        <DeploymentForm
                          type="create"
                          projectId={params.projectId}
                        />
                      }
                    >
                      <Button type="button">
                        <Plus className="mr-2 h-5 w-5" />
                        New deployment
                      </Button>
                    </DialogWithContent>
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
