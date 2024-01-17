import { DocumentIllustration } from "@/components/atoms/illustrations/document-illustration";
import { MarkdownPreview } from "@/components/atoms/markdown-preview";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "@/components/molecules/empty-state";
import Restricted from "@/components/providers/permission-provider/restricted";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TProjectDetails } from "@/lib/type";
import { Pen } from "lucide-react";
import Link from "next/link";

type DocumentProps = {
  params: {
    projectId: string;
  };
};

export default async function Document({ params }: DocumentProps) {
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  if (!projectData.description) {
    return (
      <EmptyState>
        <EmptyStateImage>
          <DocumentIllustration />
        </EmptyStateImage>
        <EmptyStateTextContent>
          <EmptyStateTitle>Your document is empty</EmptyStateTitle>
        </EmptyStateTextContent>
        <Restricted to="edit">
          <EmptyStateAction>
            <Button asChild>
              <Link href={`/project/${params.projectId}/edit/document`}>
                <Pen className="mr-2 h-5 w-5" />
                Start editing
              </Link>
            </Button>
          </EmptyStateAction>
        </Restricted>
      </EmptyState>
    );
  }
  return (
    <div className="relative flex-1 rounded-lg border p-6">
      <MarkdownPreview value={projectData.description} />
      <Restricted to="edit">
        <Button variant={"outline"} className="absolute right-6 top-6" asChild>
          <Link href={`/project/${params.projectId}/edit/document`}>
            <Pen className="mr-2 h-5 w-5" />
            Edit
          </Link>
        </Button>
      </Restricted>
    </div>
  );
}
