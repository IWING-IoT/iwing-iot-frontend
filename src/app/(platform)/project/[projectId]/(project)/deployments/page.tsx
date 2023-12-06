import { ProjectAndDeploymentCard } from "@/components/molecules/project-and-deployment-card";
import {
  SectionHeader,
  SectionHeaderAction,
  SectionHeaderDescription,
  SectionHeaderTextContent,
  SectionHeaderTitle,
} from "@/components/molecules/section-header";
import { CardGrid } from "@/components/templates/card-grid";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TPhaseDetails, TProjectDetails } from "@/lib/type";
import { Plus } from "lucide-react";

type PhaseProps = {
  params: { projectId: string };
};

const tabs = [
  { label: "Deployment", href: "deployment" },
  { label: "Collaborator", href: "collaborator" },
  { label: "Attribute data", href: "attribute-data" },
];

export default async function Phase({ params }: PhaseProps) {
  const { data: phaseData }: { data: TPhaseDetails[] } = await fetchData(
    `/project/${params.projectId}/phase?type=all`,
  );
  return (
    <>
      <SectionHeader>
        <SectionHeaderTextContent>
          <SectionHeaderTitle>Active</SectionHeaderTitle>
        </SectionHeaderTextContent>
        <SectionHeaderAction>
          <Button type="button">
            <Plus className="mr-1.5 h-5 w-5" />
            New deployment
          </Button>
        </SectionHeaderAction>
      </SectionHeader>
      <CardGrid>
        {phaseData
          .filter((phase) => phase.isActive === true)
          .map((phase) => (
            <ProjectAndDeploymentCard
              key={phase.id}
              href={`/project/${params.projectId}/deployment/${phase.id}/dashboard`}
              title={phase.name}
              owner={phase.owner}
              startedAt={phase.startedAt}
              endedAt={phase.endedAt}
              isActive={phase.isActive}
            />
          ))}
      </CardGrid>
      <SectionHeader>
        <SectionHeaderTextContent>
          <SectionHeaderTitle>Finished</SectionHeaderTitle>
        </SectionHeaderTextContent>
      </SectionHeader>
      <CardGrid>
        {phaseData
          .filter((phase) => phase.isActive === false)
          .map((phase) => (
            <ProjectAndDeploymentCard
              key={phase.id}
              href={`/project/${params.projectId}/deployment/${phase.id}/dashboard`}
              title={phase.name}
              owner={phase.owner}
              startedAt={phase.startedAt}
              endedAt={phase.endedAt}
              isActive={phase.isActive}
            />
          ))}
      </CardGrid>
    </>
  );
}
