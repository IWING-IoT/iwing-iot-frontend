import { redirect } from "next/navigation";

type ProjectProps = {
  params: { projectId: string; phaseId: string };
};

export default function Project({ params }: ProjectProps) {
  redirect(`/project/${params.projectId}/phase/${params.phaseId}/dashboard`);
}
