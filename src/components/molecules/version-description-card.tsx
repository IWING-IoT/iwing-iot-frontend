import { TFirmwareVersionDetails } from "@/lib/type";
import { Button } from "../ui/button";
import { DownloadCloud, ExternalLink, Github } from "lucide-react";
import { CustomAvatar } from "../atoms/custom-avatar";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  CardHeader,
  CardHeaderActions,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "./card-header";

type VersionDescriptionCardProps = {
  firmwareVersionData: TFirmwareVersionDetails;
};

export function VersionDescriptionCard({
  firmwareVersionData,
}: VersionDescriptionCardProps) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-md border">
      <CardHeader className="p-4">
        <CardHeaderTextContent>
          <CardHeaderTitle>
            {firmwareVersionData.description
              ? firmwareVersionData.description
              : "No description"}
          </CardHeaderTitle>
        </CardHeaderTextContent>
        <CardHeaderActions>
          <Button variant={"outline"} asChild>
            <a href={firmwareVersionData.file} download>
              <DownloadCloud className="mr-1.5 h-5 w-5" />
              Download
            </a>
          </Button>
          {firmwareVersionData.gitUrl && (
            <Button className="gap-1.5" variant={"outline"} asChild>
              <Link href={firmwareVersionData.gitUrl} target="_blank">
                <Github className="h-5 w-5" />
                Github
                <ExternalLink className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </CardHeaderActions>
      </CardHeader>
      <div className="flex gap-1 p-4">
        <div className="flex gap-2">
          <CustomAvatar value={firmwareVersionData.updatedBy} size={24} />
          <p className="text-sm">{firmwareVersionData.updatedBy}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          uploaded {formatDate(firmwareVersionData.lastUpdate, "relative")}
        </p>
      </div>
    </div>
  );
}
