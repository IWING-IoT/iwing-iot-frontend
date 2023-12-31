import { NewFirmwareVersionForm } from "@/components/forms/new-firmware-version-form";
import { HeaderTitle } from "@/components/molecules/header";
import { MainContainer } from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type NewFirmwareVersionProps = {
  params: {
    firmwareId: string;
  };
};

export default function NewFirmwareVersion({
  params,
}: NewFirmwareVersionProps) {
  return (
    <div className="flex flex-1 justify-center">
      <MainContainer className="flex max-w-xl flex-1 gap-5">
        <div>
          <Button variant={"link"} className="p-0" asChild>
            <Link href={`/firmware/${params.firmwareId}`}>
              <ArrowLeft className="mr-1.5 h-5 w-5" />
              Back to all versions
            </Link>
          </Button>
          <HeaderTitle>Add new version</HeaderTitle>
        </div>
        <NewFirmwareVersionForm firmwareId={params.firmwareId} />
      </MainContainer>
    </div>
  );
}
