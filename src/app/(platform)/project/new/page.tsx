import { NewProjectForm } from "@/components/forms/new-project-form";
import { HeaderTitle } from "@/components/molecules/header";
import { MainContainer } from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TLocation, TTemplate } from "@/lib/type";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewProject() {
  const { data: templateData }: { data: TTemplate[] } =
    await fetchData("/template");

  const { data: locationData }: { data: TLocation[] } =
    await fetchData("/location");

  return (
    <div className="flex flex-1 justify-center">
      <MainContainer className="flex max-w-xl flex-1 gap-5">
        <div>
          <Button variant={"link"} className="p-0" asChild>
            <Link href="/home?sortBy=ascending">
              <ArrowLeft className="mr-1.5 h-5 w-5" />
              Back to home
            </Link>
          </Button>
          <HeaderTitle>Create new project</HeaderTitle>
        </div>
        <NewProjectForm template={templateData} location={locationData} />
      </MainContainer>
    </div>
  );
}
