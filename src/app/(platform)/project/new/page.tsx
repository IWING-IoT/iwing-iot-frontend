import NewProjectForm from "@/components/forms/new-project-form";
import { HeaderTitle } from "@/components/molecules/header";
import MainContainer from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewProject() {
  const { data: templateData } = await fetchData("/template");
  const { data: locationData } = await fetchData("/location");
  // console.log(locationData);
  // const locationData = [
  //   {
  //     id: "65661758e5c4c90dcedb1310",
  //     th_name: "สวี, ชุมพร",
  //     en_name: "Sawi, Chumphon",
  //   },
  //   {
  //     id: "65661759e5c4c90dcedb1312",
  //     th_name: "เมืองชุมพร, ชุมพร",
  //     en_name: "Mueang Chumphon, Chumphon",
  //   },
  // ];
  return (
    <div className="flex flex-1 justify-center">
      <MainContainer className="flex max-w-xl flex-1 gap-5">
        <div>
          <Button variant={"link"} className="p-0" asChild>
            <Link href="/home?sortBy=ascending">
              <ArrowLeft className="mr-1.5 h-5 w-5" />
              Back
            </Link>
          </Button>
          <HeaderTitle>Create new project</HeaderTitle>
        </div>
        <NewProjectForm template={templateData} location={locationData} />
      </MainContainer>
    </div>
  );
}
