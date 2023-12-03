import { redirect } from "next/navigation";

type ProjectProps = {
  params: { projectId: string };
};

export default function Project({ params }: ProjectProps) {
  redirect(`/${params.projectId}/dashboard`);
}
