import { RefreshCcw } from "lucide-react";
import { FeatureIcon } from "../atoms/feature-icon";
import { Badge } from "../ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { TFirmwareType } from "@/lib/type";
import { firmwareType } from "@/lib/utils";
import Link from "next/link";

type FirmwareCardProps =
  | {
      firmwareName: string;
      firmwareId: string;
      versionName: string;
      versionId: string;
      type: TFirmwareType;
      actionType: "edit";
      autoUpdate: boolean;
      button: React.ReactNode;
    }
  | {
      firmwareName?: never;
      firmwareId?: never;
      versionName?: never;
      versionId?: never;
      type: TFirmwareType;
      actionType: "assign";
      autoUpdate?: never;
      button: React.ReactNode;
    };

export function FirmwareCard({
  firmwareName,
  firmwareId,
  versionName,
  versionId,
  type,
  actionType,
  autoUpdate,
  button,
}: FirmwareCardProps) {
  if (actionType === "assign") {
    return (
      <Card>
        <CardHeader className="gap-2">
          <CardTitle>No {firmwareType[type].toLowerCase()}</CardTitle>
          <CardDescription>
            To keep track, assign a {firmwareType[type].toLowerCase()} version.
          </CardDescription>
        </CardHeader>
        <CardFooter>{button}</CardFooter>
      </Card>
    );
  }
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="space-y-2">
        <div className="flex justify-between">
          <Link href={`/firmware/${firmwareId}/version/${versionId}/code`}>
            <CardTitle className="hover:underline">{versionName}</CardTitle>
          </Link>
          {autoUpdate && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Badge variant={"modern"} className="h-fit w-fit shrink-0">
                  Auto-update
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="flex gap-2">
                <FeatureIcon icon={<RefreshCcw />} variant="modern" />
                <div className="flex flex-col">
                  <p className="font-medium">Version auto-update</p>
                  <p className="text-sm text-muted-foreground">
                    This firmware will be updated to the latest version
                    automatically.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
        <CardDescription>
          From {firmwareName} • {firmwareType[type]}
        </CardDescription>
      </CardHeader>
      <CardFooter>{button}</CardFooter>
    </Card>
  );
}
