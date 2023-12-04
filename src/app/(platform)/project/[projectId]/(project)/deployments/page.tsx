import ProjectAndPhaseCard from "@/components/molecules/project-and-phase-card";
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
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  const { data: phaseData }: { data: TPhaseDetails[] } = await fetchData(
    `/project/${params.projectId}/phase?type=all`,
  );
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {phaseData.map((phase) => (
        <ProjectAndPhaseCard
          key={phase.id}
          href={`/project/${params.projectId}/deployment/${phase.id}/dashboard`}
          title={phase.name}
          owner={phase.owner}
          startedAt={formatDate(phase.startedAt)}
          endedAt={phase.endedAt ? formatDate(phase.endedAt) : undefined}
          isActive={phase.isActive}
        />
      ))}
    </div>
  );
}
