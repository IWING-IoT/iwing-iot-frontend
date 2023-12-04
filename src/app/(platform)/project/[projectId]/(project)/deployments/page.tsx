import ProjectAndDeploymentCard from "@/components/molecules/project-and-deployment-card";
import { CardGrid } from "@/components/templates/card-grid";
import { fetchData } from "@/lib/data-fetching";
import { TPhaseDetails, TProjectDetails } from "@/lib/type";
import { formatDate } from "@/lib/utils";

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
    <CardGrid>
      {phaseData.map((phase) => (
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
  );
}
