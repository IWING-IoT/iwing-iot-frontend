import { TFirmwareVersionDetails } from "@/lib/type";
import {
  SectionHeader,
  SectionHeaderAction,
  SectionHeaderTextContent,
  SectionHeaderTitle,
} from "./section-header";
import { Button } from "../ui/button";
import { DownloadCloud, Github } from "lucide-react";
import { CustomAvatar } from "../atoms/custom-avatar";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

type VersionDescriptionCardProps = {
  firmwareVersionData: TFirmwareVersionDetails;
};

export function VersionDescriptionCard({
  firmwareVersionData,
}: VersionDescriptionCardProps) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-md border">
      <SectionHeader className="items-center border-b bg-muted/50 p-4">
        <SectionHeaderTextContent>
          <SectionHeaderTitle>
            {firmwareVersionData.description ?? "No description"}
          </SectionHeaderTitle>
        </SectionHeaderTextContent>
        <SectionHeaderAction>
          <Button variant={"outline"} asChild>
            <a href={firmwareVersionData.file} download>
              <DownloadCloud className="mr-1.5 h-5 w-5" />
              Download
            </a>
          </Button>
          {firmwareVersionData.gitUrl && (
            <Button variant={"outline"} asChild>
              <Link href={firmwareVersionData.gitUrl}>
                <Github className="mr-1.5 h-5 w-5" />
                Github
              </Link>
            </Button>
          )}
        </SectionHeaderAction>
      </SectionHeader>
      <div className="flex gap-1 p-4">
        <div className="flex gap-2">
          <CustomAvatar value={firmwareVersionData.updatedBy} size={24} />
          <p className="text-sm">{firmwareVersionData.updatedBy}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          uploaded on {formatDate(firmwareVersionData.lastUpdate)}
        </p>
      </div>
    </div>
  );
}
