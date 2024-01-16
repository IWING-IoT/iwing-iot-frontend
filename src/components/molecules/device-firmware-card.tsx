import { FilePlus, Pen, RefreshCcw } from "lucide-react";
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
import { Button } from "../ui/button";
import { firmwareType } from "@/lib/utils";

type FirmwareCardProps =
  | {
      firmwareName: string;
      versionName: string;
      type: TFirmwareType;
      actionType: "edit";
      autoUpdate: boolean;
      button: React.ReactNode;
    }
  | {
      firmwareName?: never;
      versionName?: never;
      type: TFirmwareType;
      actionType: "assign";
      autoUpdate?: never;
      button: React.ReactNode;
    };

export function FirmwareCard({
  versionName,
  firmwareName,
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
    <Card>
      <CardHeader className="flex-row justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>{versionName}</CardTitle>
          <CardDescription>
            From {firmwareName} • {firmwareType[type]}
          </CardDescription>
        </div>
        {autoUpdate && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Badge variant={"modern"} className="h-fit w-fit">
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
      </CardHeader>
      <CardFooter>{button}</CardFooter>
    </Card>
  );
}
