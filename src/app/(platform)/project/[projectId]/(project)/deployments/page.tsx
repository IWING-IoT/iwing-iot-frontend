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
import { AlertDialog } from "@/components/organisms/dialogs/alert-dialog";
import { CardGrid } from "@/components/templates/card-grid";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TPhaseDetails } from "@/lib/type";
import { AlertCircle, Plus } from "lucide-react";
import Link from "next/link";

type PhaseProps = {
  params: { projectId: string };
};

const tabs = [
  { label: "Deployment", href: "deployment" },
  { label: "Collaborator", href: "collaborator" },
  { label: "Attribute data", href: "attribute-data" },
];

export default async function Deployment({ params }: PhaseProps) {
  const { data: phaseData }: { data: TPhaseDetails[] } = await fetchData(
    `/project/${params.projectId}/phase?type=all`,
  );
  const activePhase = phaseData.filter((phase) => phase.isActive === true);
  // const activePhase = [];
  const finishedPhase = phaseData.filter((phase) => phase.isActive === false);
  // const finishedPhase = [];

  function CreateDeploymentWarningDialog() {
    return (
      <AlertDialog
        variant="warning"
        icon={<AlertCircle />}
        title={"You have an active deployment"}
        description={
          "Create new deployment will mark the current deployment as finished. Continue anyway?"
        }
        submitButton={
          <Button type="button" className="flex-1" asChild>
            <Link href={"deployment/new"}>Continue</Link>
          </Button>
        }
      >
        <Button type="button">
          <Plus className="mr-1.5 h-5 w-5" />
          New deployment
        </Button>
      </AlertDialog>
    );
  }

  if (phaseData.length === 0) {
    return (
      <EmptyState>
        <EmptyStateImage>
          <ProjectIllustration />
        </EmptyStateImage>
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
      </EmptyState>
    );
  } else {
    return (
      <>
        {activePhase.length !== 0 && (
          <>
            <SectionHeader>
              <SectionHeaderTextContent>
                <SectionHeaderTitle>Active</SectionHeaderTitle>
              </SectionHeaderTextContent>
              <SectionHeaderAction>
                <CreateDeploymentWarningDialog />
              </SectionHeaderAction>
            </SectionHeader>
            <CardGrid>
              {phaseData
                .filter((phase) => phase.isActive === true)
                .map((phase) => (
                  <ProjectAndDeploymentCard
                    key={phase.id}
                    href={`deployment/${phase.id}/dashboard`}
                    title={phase.name}
                    owner={phase.owner}
                    startedAt={phase.startedAt}
                    endedAt={phase.endedAt}
                    isActive={phase.isActive}
                  />
                ))}
            </CardGrid>
          </>
        )}
        {finishedPhase.length !== 0 && (
          <>
            <SectionHeader>
              <SectionHeaderTextContent>
                <SectionHeaderTitle>Finished</SectionHeaderTitle>
              </SectionHeaderTextContent>
              {activePhase.length === 0 && (
                <SectionHeaderAction>
                  <Button type="button" asChild>
                    <Link href={"deployment/new"}>
                      <Plus className="mr-1.5 h-5 w-5" />
                      New deployment
                    </Link>
                  </Button>
                </SectionHeaderAction>
              )}
            </SectionHeader>
            <CardGrid>
              {phaseData
                .filter((phase) => phase.isActive === false)
                .map((phase) => (
                  <ProjectAndDeploymentCard
                    key={phase.id}
                    href={`deployment/${phase.id}/dashboard`}
                    title={phase.name}
                    owner={phase.owner}
                    startedAt={phase.startedAt}
                    endedAt={phase.endedAt}
                    isActive={phase.isActive}
                  />
                ))}
            </CardGrid>
          </>
        )}
      </>
    );
  }
}
