import { DeploymentForm } from "@/components/forms/deployment-form";
import { HeaderTitle } from "@/components/molecules/header";
import { MainContainer } from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type NewDeploymentProps = {
  params: { projectId: string };
};

export default function NewDeploument({ params }: NewDeploymentProps) {
  return (
    <div className="flex flex-1 justify-center">
      <MainContainer className="flex max-w-xl flex-1 gap-5">
        <div>
          <Button variant={"link"} className="p-0" asChild>
            <Link href={`/project/${params.projectId}/deployments`}>
              <ArrowLeft className="mr-1.5 h-5 w-5" />
              Back to deployments
            </Link>
          </Button>
          <HeaderTitle>Create new deployment</HeaderTitle>
        </div>
        <DeploymentForm projectId={params.projectId} submitLabel="Create" />
      </MainContainer>
    </div>
  );
}
