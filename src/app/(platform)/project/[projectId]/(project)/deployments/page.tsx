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
import { TPhaseDetails } from "@/lib/type";
import { Plus } from "lucide-react";
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

  if (phaseData.length === 0) {
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
              <EmptyStateDescription>
                You don't have permission to create new deployments
              </EmptyStateDescription>
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
        {activePhase.length !== 0 && (
          <>
            <SectionHeader>
              <SectionHeaderTextContent>
                <SectionHeaderTitle>Active</SectionHeaderTitle>
              </SectionHeaderTextContent>
              <Restricted to="edit">
                <SectionHeaderAction>
                  <Button type="button" className="flex-1" asChild>
                    <Link href={"deployment/new"}>Continue</Link>
                  </Button>
                </SectionHeaderAction>
              </Restricted>
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
              <Restricted to="edit">
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
              </Restricted>
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
