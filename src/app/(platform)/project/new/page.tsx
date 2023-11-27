import NewProjectForm from "@/components/forms/new-project-form";
import { HeaderTitle } from "@/components/molecules/header";
import MainContainer from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { fetchTemplate } from "@/lib/data-fetching";
import { ArrowLeft } from "lucide-react";

export default async function NewProject() {
  const { data } = await fetchTemplate();
  //   console.log(data);
  return (
    <div className="flex flex-1 justify-center">
      <MainContainer className="flex max-w-xl flex-1 gap-5">
        <div>
          <Button variant={"link"} className="p-0">
            <ArrowLeft className="mr-1.5 h-5 w-5" />
            Back
          </Button>
          <HeaderTitle>Create a new project</HeaderTitle>
        </div>
        <NewProjectForm template={data} />
      </MainContainer>
    </div>
  );
}
