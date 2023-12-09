import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Dot, MapPin, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/utils";

type ProjectAndDeploymentCardProps = {
  href: string;
  title: string;
  owner: string;
  location?: string;
  startedAt: string;
  endedAt?: string;
  isActive?: boolean;
};

export function ProjectAndDeploymentCard({
  href,
  title,
  owner,
  location,
  startedAt,
  endedAt,
  isActive,
}: ProjectAndDeploymentCardProps) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-md">
        <CardHeader className="flex-row items-center gap-2">
          <CardTitle className="truncate text-xl hover:underline">
            {title}
          </CardTitle>
          {isActive && <Badge variant={"success"}>Active</Badge>}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 text-muted-foreground">
            <div className="flex gap-2">
              <User className="shrink-0" />
              <span>{owner}</span>
            </div>
            {location && (
              <div className="flex gap-2">
                <MapPin className="shrink-0" />
                <span>{location}</span>
              </div>
            )}
            <div className="flex gap-2">
              <Calendar className="shrink-0" />
              <span>
                {endedAt
                  ? `${formatDate(startedAt)} - ${formatDate(endedAt)}`
                  : `${formatDate(startedAt)}`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
